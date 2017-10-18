
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'bw-contact',
  templateUrl: 'contact.html'
})
export class ContactComponent {

  @Input() contact: any = {};
  @Output() onContactClick = new EventEmitter();

  constructor() { }

  onClick() {
    this.onContactClick.emit(this.contact);
  }

}
