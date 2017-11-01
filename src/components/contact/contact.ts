import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'bw-contact',
  templateUrl: 'contact.html',
})
export class ContactComponent {
  @Input() contact: any = {};
  @Input('alignLeft') alignLeft: boolean;
  @Output() onContactClick = new EventEmitter();

  placeholder: string = 'assets/img/profile-placeholder.png';

  constructor() {}

  onClick() {
    this.onContactClick.emit(this.contact);
  }
}
