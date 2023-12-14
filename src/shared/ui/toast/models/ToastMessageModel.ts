/**Настройки выводимого сообщения */
export default class ToastMessageModel {
  /**Ширина блока сообщения */
  width: string = '280px';
  /**Заголовок сообщения */
  title?: string = '';
  /**Детальное содержание сообщения */
  detail?: string = '';
  /**Возможно ли закрытие сообщения */
  closable?: boolean = true;
  /**Время, через которое сообщение исчезнет */
  life?: number = 3000;
  /**Группа в которой отобразится сообщение */
  group?: string = 'default';
  /**Цвет фона */
  backgroundColor: string = '#525266';
  /**Цвет заголовка */
  titleColor: string = '#b8b8cc';
  /**Цвет детального сообщения */
  detailColor: string = '#fff';
  /**Прозрачность блока сообщения */
  opacity: string = '.95';
  /**Тень блока сообщения */
  boxShadow: string = '0 16px 32px 0 rgba(82, 82, 100, 0.5)';
  /**Закругление блока сообщения */
  borderRadius: string = '8px';

  constructor(obj?: Partial<ToastMessageModel>) {
    if (obj) Object.assign(this, obj);
  }
}
