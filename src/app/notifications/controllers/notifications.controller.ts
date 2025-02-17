import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@app/notifications/services/send-notification';
import { CancelNotification } from '@app/notifications/services/cancel-notification';
import { ReadNotification } from '@app/notifications/services/read-notification';
import { UnreadNotification } from '@app/notifications/services/unread-notification';
import { CountRecipientNotifications } from '@app/notifications/services/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/notifications/services/get-recipient-notifications';
import { CreateNotificationDto } from '@app/notifications/dtos/create-notification.dto';
import { NotificationView } from '@app/notifications/views/notification.view';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendNotificationPayload } from '@app/notifications/interfaces/notifications';

@Controller('notifications')  
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationView.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationDto) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationView.toFront(notification),
    };
  }

    @EventPattern('notifications.send-notification')
    async handleSendNotification(
      @Payload() { content, category, recipientId }: SendNotificationPayload,
    ) {
      await this.sendNotification.execute({
        content,
        category,
        recipientId,
      });
    }
}
