import { Notification } from '@app/notifications/entities/notification';

export class NotificationView {
  static toFront(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
    };
  }
}
