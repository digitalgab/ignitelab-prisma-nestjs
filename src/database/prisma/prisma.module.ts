import { Module } from '@nestjs/common';
import { NotificationsInterface } from '@app/notifications/interfaces/notifications';
import { PrismaService } from './prisma.service';
import { NotificationsInterface } from '../../app/notifications/repositories/notifications.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsInterface,
      useClass: NotificationsInterface,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
