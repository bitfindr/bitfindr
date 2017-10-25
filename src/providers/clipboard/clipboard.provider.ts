import { Platform } from 'ionic-angular';
import { Injectable, Renderer } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard';
import { ClipboardService } from 'ngx-clipboard';

@Injectable()
export class ClipboardProvider {
  constructor(
    private platform: Platform,
    private nativeClipboard: Clipboard,
    private jsClipboard: ClipboardService
  ) {}

  copy(content: string, renderer: Renderer) {
    return this.platform.is('cordova')
      ? this.nativeCopy(content)
      : this.jsCopy(content, renderer);
  }

  nativeCopy(content) {
    return this.nativeClipboard.copy(content);
  }

  jsCopy(content, renderer) {
    return Promise.resolve(this.jsClipboard.copyFromContent(content, renderer));
  }
}
