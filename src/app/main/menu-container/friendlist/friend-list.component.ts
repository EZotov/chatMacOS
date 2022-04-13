import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../../enteties/enteties';
import { Observable } from 'rxjs';
import { usersSelector } from '../../../store/app.selectors';
import { openProfile } from '../../../store/app.actions';

@Component(
  {
    selector : 'friend-list',
    templateUrl : './friend-list.component.html',
    styleUrls : ['./friend-list.component.scss']
  }
)

export class FriendListComponent {
    usersList$ : Observable<User[]> = this.store.select(usersSelector);
    usersCount : number = 0;

    constructor(
      private store : Store
    ) {
      this.usersList$.subscribe((data : User[]) => {
        this.usersCount = data.length;
      });
    }

    onClickUser(user : User) : void {
      this.store.dispatch(openProfile({selectedProfile : user}));
    }

    public friendListItemClasses(user : User) : string[] {
      if (user.status === 'Online') {
        return ['friendListItem', 'friendListItem_online'];
      }
      else {
        return ['friendListItem'];
      }
    }
}
