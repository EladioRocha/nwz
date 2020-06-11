import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-users-chat',
  templateUrl: './users-chat.component.html',
  styleUrls: ['./users-chat.component.scss']
})
export class UsersChatComponent implements OnInit {

  constructor(private _webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this._webSocketService.listen('test').subscribe(data => console.log(data))
  }

}
