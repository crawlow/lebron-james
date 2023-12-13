/**
 * Модель ошибки
 */
export class ErrorModel {
  /** Изображение */
  img: string;
  /** Заголовок */
  title: string = 'Empty here';
  /** Описание */
  description: string;
  constructor(obj?: Partial<ErrorModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
