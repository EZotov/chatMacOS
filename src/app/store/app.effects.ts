import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { MainService } from '../main/main.service';
import { loadUsers, loadUsersSuccess, loadChannels, loadChannelsSuccess } from './app.actions';
import { mergeMap, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';



@Injectable()
export class MainEffects {
  constructor(
    private actions$ : Actions,
    private service : MainService
  ) { }

  LoadUsers$ : Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(action =>
        this.service.getUsers()
          .pipe(
            map(users => loadUsersSuccess({users : users}))
          )
        )
      )
    )

    LoadChannels$ : Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(loadChannels),
        mergeMap(action =>
          this.service.getChannels()
            .pipe(
              map(channels => loadChannelsSuccess({channels : channels}))
            )
          )
        )
      )
}
