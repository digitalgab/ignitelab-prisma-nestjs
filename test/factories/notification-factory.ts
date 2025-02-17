import { Content } from '@app/notifications/entities/content';
import {
  Notification,
  NotificationParams,
} from '@app/notifications/entities/notification';

type Override = Partial<NotificationParams>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Nova solicitação de amizade!'),
    recipientId: 'recipient-2',
    ...override,
  });
}
