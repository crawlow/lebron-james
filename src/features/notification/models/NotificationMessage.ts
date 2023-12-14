import { ToastMessageModel } from '@/shared/ui/toast';

export class NotificationMessage {
  static Error(message: string): ToastMessageModel {
    return new ToastMessageModel({
      detail: message,
      group: 'app',
      closable: false,
      life: 3000,
      width: 'auto',
    });
  }
}
