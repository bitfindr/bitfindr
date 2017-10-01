
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'contact',
  templateUrl: 'contact.html'
})
export class ContactComponent {
  @Input() contact: any = {};

  @Output('onContactClick') onContactClick = new EventEmitter();

  constructor() { }

  onClick() {
    this.onContactClick.emit(this.contact);
  }

}
