import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Channel } from '../../../enteties/enteties';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { channelsSelector } from '../../../store/app.selectors';
import { ActivatedRoute} from '@angular/router';

@Component(
  {
    selector : 'channel-list',
    templateUrl : 'channel-list.component.html',
    styleUrls : ['channel-list.component.scss']
  }
)

export class ChannelListComponent {

  channelList$ : Observable<Channel[]> = this.store.select(channelsSelector);
  channelCount : number = 0;
  channelRouteId : string = '';

  constructor(
    private store : Store,
    private activateRoute : ActivatedRoute,
  ) {
    this.channelList$.subscribe((data : Channel[]) => {
      this.channelCount = data.length;
    });

    this.activateRoute.paramMap.pipe(
      switchMap(params => params.getAll('channelId'))
    )
    .subscribe(data => this.channelRouteId = data);
  }

  public channelListItemClasses(channel : Channel) : string[] {
    if (channel.title === this.channelRouteId) {
      return ['channelListItem', 'channelListItem_active'];
    }
    else {
      return ['channelListItem'];
    }
  }
}
