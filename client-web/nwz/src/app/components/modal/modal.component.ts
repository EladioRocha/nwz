import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() visible: boolean
  @Output() hide: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() { 
    this.visible = false
  }

  hideModal() {
    this.visible = false
    this.hide.emit(false)
  }
  
}
