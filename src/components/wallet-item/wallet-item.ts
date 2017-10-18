import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bw-wallet-item',
  templateUrl: 'wallet-item.html'
})
export class WalletItemComponent {

  expand: boolean;
  @Input() broker: string;
  @Output() onWalletClick = new EventEmitter();
  @Output() onQrCodeClick = new EventEmitter();

  constructor() {
    console.log('Hello WalletItemComponent Component');
  }

  toggleWallets() {
    this.expand = !this.expand;
  }

  onClick(hash) {
    this.onWalletClick.emit(hash);
  }

  qrCodeClick(event, hash) {
    event.stopPropagation();
    this.onQrCodeClick.emit(hash);
  }
}
