import { Component, Input, ViewChild, HostListener, OnChanges } from '@angular/core';
import { User } from '../../enteties/enteties';
import { Store } from '@ngrx/store';
import { closeProfile } from '../../store/app.actions';



@Component(
  {
    selector : 'profile',
    templateUrl : './profile.component.html',
    styleUrls : ['./profile.component.scss']
  }
)

export class ProfileComponent implements OnChanges {
  @Input()
  user : User = {
    userName : "luna44",
    name : "Amilia Luna",
    status : "Online",
    jobTitle : "UI Designer",
    mail : "luna44@gmail.com",
    skype : "luna44",
    timezone : "Local time",
    photo : "/assets/photos/Object.png"
  }

  @Input()
  openedProfile : boolean = false;

  @ViewChild('profileDropDown')
  element : any;

  date : Date = new Date();

  profileDropdownOpened : boolean = false;

  profileControlsMenu : string[] = ['Delete from friends', 'Update status'];

  constructor(
    private store : Store
  ) {

  }

  ngOnChanges() : void {
    this.date = new Date();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.element.nativeElement.contains(event.target) && this.profileDropdownOpened === true) {
      this.profileDropdownOpened = false;
    }
  }

  onClickProfileDropdownBtn() : void {
    this.profileDropdownOpened = !this.profileDropdownOpened;
  }

  onClickCloseProfileBtn() : void {
    this.store.dispatch(closeProfile());
  }

  public get profileContainerClasses() {
    if (this.openedProfile) {
      return ['profileOuterContainer', 'profileOuterContainer_opened'];
    }
    else {
      return ['profileOuterContainer'];
    }
  }

  public get profileClasses() {
    if (this.profileDropdownOpened) {
      return ['profileDropdown', 'profileDropdown_opened'];
    }
    return ['profileDropdown'];
  }

  public get profileInfoNameClasses() {
    if (this.user.status === 'Online') {
      return ['profileInfo__name', 'profileInfo__name_online'];
    }
    else {
      return ['profileInfo__name'];
    }
  }
}
