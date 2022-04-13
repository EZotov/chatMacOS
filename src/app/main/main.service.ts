import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User, Channel, Message, NewMessage } from '../enteties/enteties';

@Injectable()
export class MainService {
  constructor(
    private http : HttpClient
  ) { };




  getUsers() : Observable<User[]> {
    return new Observable((sub)=>{
      let usersData : {[k : string] : any};
      let usersList : User[] = [];
      this.http.get('assets/data/users.json').subscribe(
        (data) => {
          usersData = data;
          usersData['value'].forEach((user : User) => {
            usersList.push(user);
          });
          sub.next(usersList);
          sub.complete();
        });
    });
  }

  getChannels() : Observable<Channel[]> {
    return new Observable((sub) => {
      let channelData : {[k : string] : any};
      let channelList : Channel[] = [];
      let messageList : Message[] = [];
      let membersList : string[] = [];
      this.http.get('assets/data/channels.json').subscribe(
        (data) => {
          channelData = data;
          channelData['value'].forEach((channel : Channel) => {
            channel.members.forEach((member : string) => {
              membersList.push(member);
            });
            channel.messages.forEach((message : any) => {
              const newDate = new Date(message.date);

              const newMessage : Message = {
                idMessage : message.idMessage,
                text : message.text,
                authorUserName : message.author,
                date : newDate
              }
              messageList.push(newMessage);
            });
            const newChannel : Channel = {
              title : channel.title,
              members : membersList,
              messages : messageList,
            }
            channelList.push(newChannel);
            membersList = [];
            messageList = [];
          });
          sub.next(channelList);
          sub.complete();
        });
    });
  }

  addUserInfoToMessage(message : Message, users : User[]) : NewMessage {
    let findedUser : any = users.find(user => user.userName === message.authorUserName);
    let newMessage : NewMessage = {
      idMessage : message.idMessage,
      text: message.text,
      date : message.date,
      author : findedUser,
      showDateLine : false
    }
    return newMessage;
  }

  changeDisplayDateLineMode(messageList : NewMessage[]) : NewMessage[] {
    const newMessgaeList : any = messageList.map((message : NewMessage, i : number, messages : NewMessage[]) => {
      if (i !== 0) {
        if (message.date.toLocaleString('ru-RU').substring(0, 9) !== messages[i-1].date.toLocaleString('ru-RU').substring(0, 9)) {
          return {...message, showDateLine : true};
        }
        else {
          return message;
        }
      }
      else {
        return {...message, showDateLine : true};
      }
    });
    return newMessgaeList;
  }
}
