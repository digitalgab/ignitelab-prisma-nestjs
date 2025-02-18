import { Content } from '@app/notifications/entities/content';
import { Notification } from '../entities/notification';

export abstract class NotificationsInterface {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
}
export interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}
