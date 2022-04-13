import { Component, Input, OnChanges } from '@angular/core';
import { Channel } from '../../../enteties/enteties';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { searchAction } from '../../../store/app.actions';

@Component(
  {
    selector : 'chat-header',
    templateUrl : './chat-header.component.html',
    styleUrls : ['./chat-header.component.scss']
  }
)

export class ChatHeaderComponent implements OnChanges {

  @Input()
  currentChannel : Channel = {
    title : '',
    members : [],
    messages : []
  };

  channelMembersCount : number = 0;

  searchForm : FormGroup = new FormGroup(
    {searchText : new FormControl()}
  );

  constructor(
    private store : Store
  ) {
    this.searchForm.valueChanges.subscribe(value  => this.store.dispatch(searchAction({searchText : value.searchText})));
  }

  ngOnChanges() : void {
    this.channelMembersCount = this.currentChannel?.members.length;
    this.searchForm.reset();
  }
}
