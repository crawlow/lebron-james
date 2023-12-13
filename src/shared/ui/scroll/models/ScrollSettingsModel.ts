import { IScrollSettings } from '../interfaces'
/**
 * Настройки
 */
export default class ScrollSettingsModel implements IScrollSettings {
  /**
   * Скролл по X
   */
  X: number
  /**
   * Скролл по Y
   */
  Y: number
  constructor (obj?: Partial<ScrollSettingsModel>) {
    if (obj) Object.assign(this, obj);
  }
}