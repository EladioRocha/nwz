import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users-chat',
  templateUrl: './users-chat.component.html',
  styleUrls: ['./users-chat.component.scss']
})
export class UsersChatComponent implements OnInit {
  public chats: []
  public messages: any[]
  public API_URL_BASE: string = 'https://nwz-s3-files.s3-us-west-1.amazonaws.com/images/pictures'
  private _currentRoom
  private _currentBorrower
  public _showFooterChat: boolean = false
  public modal: boolean = false
  public days = [1,2,3,4,5,6,7]
  private _day = 1
  public books: any[]

  constructor(private _webSocketService: WebSocketService, public _user: UserService, private _api: ApiService) { }

  ngOnInit(): void {
    this._api.getChats().subscribe(response => this.getChatsResponse(response))
    this._webSocketService.listen('message').subscribe(data => this.messages.push(data))
  }

  
  getChatsResponse(response) { 
    const status = response.status
    if(status === 200) {
      this.chats = response.data
      this.createRooms(this.chats)

    }
  }

  createRooms(chats) {
    for(let chat of chats) {
      this._webSocketService.emit('join:room', {room: chat._id})
    }
  }

  getMessagesFromChat(chat, user1, user2) {
    this._currentBorrower = (this._user.user._id === user1) ? user2 : user1
    this._showFooterChat = true
    this._api.getMessages(chat).subscribe(response => this.getMessagesFromChatResponse(response))
  }

  getMessagesFromChatResponse(response) {
    const status = response.status
    if(status === 200) {
      this.messages = response.data
      this._currentRoom = response.data[0].chat_id
    }

  }

  sendMessage(target, message) {
    if(message.length > 0) {
      this._webSocketService.emit('message', {message, room: this._currentRoom, sender: this._user.user._id})
      target.value = ''
    }
  }

  showModal() {
    this.modal = true
    this.getBooks()
  }

  hideModal(e) {
    this.modal = false
  }

  selectDays(value) {
    this._day = value
  }

  getBooks() {
    this._api.getMyBooksNoEbook().subscribe(response => this.getBooksResponse(response))
  }

  getBooksResponse(response) {
    
    this.books = response.data
    console.log(this.books)
  }

  breakFreeBook() {
    const book = (document.querySelector('#book-books') as HTMLInputElement).value
    this._api.requestBook(book, this._day, '5ecec9791ba037668c2fc64e', 'book', this._currentBorrower).subscribe(response => console.log(response))
  }

}
