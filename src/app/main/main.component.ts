import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'
import { User, Channel } from '../enteties/enteties';
import { loadUsers, loadChannels } from '../store/app.actions';
import { firsChannelSelector, selectedProfileSelector, loginUserSelector } from '../store/app.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  selectedProfile : User = {
    userName : "",
    name : "",
    status : "",
    jobTitle : "",
    mail : "",
    skype : "",
    timezone : "",
    photo : ""
  };
  openedProfile : boolean = false;

  selectedProfile$ : Observable<any> = this.store.select(selectedProfileSelector);
  firstChannel$ : Observable<Channel | null> = this.store.select(firsChannelSelector);
  loginUser$ : Observable<User> = this.store.select(loginUserSelector);

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
    private router : Router
  )
  {
    this.loginUser$.subscribe(user => this.loginUser = user);

    if (this.loginUser.userName) {
      this.store.dispatch(loadUsers());
      this.store.dispatch(loadChannels());

      this.selectedProfile$.subscribe(data => {
        this.selectedProfile = data.selectedProfile;
        this.openedProfile = data.openedProfile;
      });

      this.firstChannel$.subscribe((data) => {
        if (data) {
          this.router.navigate([`main/${data.title}`]);
        }
      })
    }
    else {
        this.router.navigate(['auth']);
    }
  }

  public get profileContainerClasses() {
    if (this.openedProfile) {
      return ['profileContainer', 'profileContainer_opened'];
    }
    else {
      return ['profileContainer'];
    }
  }
}
