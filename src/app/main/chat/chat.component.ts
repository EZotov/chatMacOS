import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { channelsSelector, loginUserSelector } from '../../store/app.selectors';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Channel, User } from '../../enteties/enteties';
import { ActivatedRoute} from '@angular/router';

@Component(
  {
    selector : 'chat',
    templateUrl : './chat.component.html',
    styleUrls : ['./chat.component.scss']
  }
)

export class ChatComponent {
  channelList$ : Observable<Channel[]> = this.store.select(channelsSelector);
  loginUser$ : Observable<User> = this.store.select(loginUserSelector);


  channelRouteId : string = '';
  channelsList : Channel[] = [];
  currentChannel : Channel = {
    title : '',
    members : [],
    messages : []
  };

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

  constructor(
    private store : Store,
    private activateRoute: ActivatedRoute
  ) {

    this.loginUser$.subscribe(user => this.loginUser = user);

    this.activateRoute.paramMap.pipe(
      switchMap(params => params.getAll('channelId'))
    )
    .subscribe(data => {
      this.channelRouteId = data;
      this.channelList$.subscribe((channels) => {
        this.channelsList = channels;
        this.currentChannel = this.channelsList.filter((channel : Channel) => channel.title === this.channelRouteId)[0];
      });
    });

  }
}
