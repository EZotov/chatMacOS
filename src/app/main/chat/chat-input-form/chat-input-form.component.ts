import { Component, Input, OnChanges } from '@angular/core';
import { User, Channel, Message } from '../../../enteties/enteties';
import { Store } from '@ngrx/store';
import { sendMessage } from '../../../store/app.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component(
  {
    selector : 'chat-input-form',
    templateUrl : 'chat-input-form.component.html',
    styleUrls : ['chat-input-form.component.scss']
  }
)

export class ChatInputFormComponent implements OnChanges{

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
  }

  @Input()
  currentChannel : Channel = {
    title : '',
    members : [],
    messages : []
  }

  messageForm : FormGroup = new FormGroup({
    message : new FormControl(null, Validators.required)
  });

  placeholder : string = '';

  constructor(
    private store : Store
  ) { }

  ngOnChanges() : void {
    this.placeholder = `Message in #${this.currentChannel.title}`;
  }

  onKeyDownEnter(event : Event) : void {
    event.preventDefault();
  }

  onSubmitChatForm(event : Event) : void {
    let nowDate : Date = new Date();
    let lastIdMessage : number = 0;

    if (this.currentChannel.messages.length) {
      lastIdMessage = this.currentChannel.messages.length;
    }

    const message : Message = {
      idMessage : lastIdMessage + 1,
      date : nowDate,
      text : this.messageForm.value.message,
      authorUserName : this.loginUser.userName
    }
    this.store.dispatch(sendMessage({channel : this.currentChannel, message : message}));
    this.messageForm.reset();
  }
}
