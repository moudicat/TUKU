import {imageResource} from 'resource/image';
import {SessionService} from 'service/session';

export class ImageService {
  static webpChecked = false;

  static async loadHistory() {
    if (!SessionService.isExist()) return null;
    return await imageResource.getHistory();
  }

  static async checkWebp() {
    if (ImageService.webpChecked) return window.isSupportWebp;
    window.isSupportWebp = false;
    const img = new Image();
    return new Promise((res) => {
      function getResult(event) {
        window.isSupportWebp = event && event.type === 'load' ? img.width == 1 : false;
        ImageService.webpChecked = true;
        res(window.isSupportWebp);
      }

      img.onerror = getResult;
      img.onload = getResult;
      img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
    });
  }
}