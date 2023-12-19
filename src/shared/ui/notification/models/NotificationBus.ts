import { ToastMessageModel, ToastEventBus } from '@/shared';

export class NotificationBus {
  /**Уникальный идентификатор группы уведомлений */
  Group: string = 'default';

  /**Показать уведомление */
  Show(message: ToastMessageModel) {
    ToastEventBus.emit('add', message);
  }

  constructor(obj?: Partial<NotificationBus>) {
    if (obj) Object.assign(this, obj);
  }
}
