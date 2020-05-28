import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() visible: boolean
  @Output() hide: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() { 
    this.visible = false
  }

  ngOnInit(): void {
  }

  hideModal() {
    this.visible = false
    this.hide.emit(false)
  }
}
