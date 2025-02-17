import { Injectable } from '@nestjs/common';
import { Notification } from '@app/notifications/entities/notification';
import { NotificationsInterface } from '@app/notifications/interfaces/notifications';
import { PrismaService } from '@database/prisma/prisma.service';
import { NotificationsMapper } from '../mappers/notification-mapper';

@Injectable()
export class NotificationsRepository implements NotificationsInterface {
  constructor(private database: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.database.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }

    return NotificationsMapper.toService(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.database.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(NotificationsMapper.toService);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.database.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async create(notification: Notification): Promise<void> {
    const raw = NotificationsMapper.toDatabase(notification);

    await this.database.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = NotificationsMapper.toDatabase(notification);

    await this.database.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
