import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  modal: boolean
  constructor() {
    this.modal = false
   }

   showModal() {
     this.modal = true
   }

   hideModal(e /*Event value: boolean*/) {
     this.modal = e
   }

  ngOnInit(): void {
  }
}
