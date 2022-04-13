import { Component, Input, OnChanges } from '@angular/core';
import { Message, Channel, User, NewMessage } from '../../../enteties/enteties';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { usersSelector, searchTextSelector } from '../../../store/app.selectors';
import { openProfile } from '../../../store/app.actions';
import { MainService } from '../../main.service';


@Component(
  {
    selector : 'chat-list',
    templateUrl : 'chat-list.component.html',
    styleUrls : ['chat-list.component.scss']
  }
)

export class ChatListComponent implements OnChanges{

  @Input()
  currentChannel : Channel = {
    title : '',
    members : [],
    messages : []
  };

  @Input()
  loginUser : User = {
    userName : "",
    name : "",
    status : "",
    jobTitle : "",
    mail : "",
    skype : "",
    timezone : "",
    photo : ""
  };

  usersList$ : Observable<User[]> = this.store.select(usersSelector);
  searchText$ : Observable<string> = this.store.select(searchTextSelector);

  viewMessageList : NewMessage[] = [];
  messageList : NewMessage[] = [];
  usersList : User[] = [];

  constructor(
    private store : Store,
    private service : MainService
  ) {

  }

  onClickAuthorOfMessage(author : User) : void {
    this.store.dispatch(openProfile({selectedProfile : author}));
  }

  ngOnChanges() : void {
    this.messageList = [];
    this.usersList$.subscribe(users => this.usersList = users);

    this.currentChannel.messages.forEach((message : Message) => {
      if (message.authorUserName === 'user') {
        const newMessage : NewMessage = {
          idMessage : message.idMessage,
          date : message.date,
          text : message.text,
          author : this.loginUser,
          showDateLine : false
        }
        this.messageList.push(newMessage);
      }
      else {
        this.messageList.push(this.service.addUserInfoToMessage(message, this.usersList));
      }
    });

    if (this.messageList.length) {
      console.log(this.messageList);

      this.messageList = this.service.changeDisplayDateLineMode(this.messageList);
    }

    this.searchText$.subscribe(searchText => {
      if (searchText) {
        this.viewMessageList = this.service.changeDisplayDateLineMode(this.messageList.filter(message => message.text.toLowerCase().includes(searchText.toLowerCase())));
      }
      else {
        this.viewMessageList = this.messageList;
      }
    });
  }
}
