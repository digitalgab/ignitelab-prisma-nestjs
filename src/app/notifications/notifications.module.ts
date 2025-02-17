import { Module } from '@nestjs/common';
import { SendNotification } from '@app/notifications/services/send-notification';
import { DatabaseModule } from '../../database/prisma/prisma.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@app/notifications/services/cancel-notification';
import { CountRecipientNotifications } from '@app/notifications/services/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/notifications/services/get-recipient-notifications';
import { ReadNotification } from '@app/notifications/services/read-notification';
import { UnreadNotification } from '@app/notifications/services/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
