import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MainComponent } from './main.component';
import { MenuComponent } from './menu-container/menu-container.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChannelListComponent } from './menu-container/chanellist/channel-list.component';
import { FriendListComponent } from './menu-container/friendlist/friend-list.component';

import { ProfileComponent } from './profile/profile.component';

import { ChatComponent } from './chat/chat.component';
import { ChatHeaderComponent } from './chat/chat-header/chat-header.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { ChatInputFormComponent } from './chat/chat-input-form/chat-input-form.component';

//Services
import { MainService } from './main.service';
//Effects
import { MainEffects } from '../store/app.effects';

import { usersReducer, channelsReducer } from '../store/app.reducers';

@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    MenuComponent,
    ChannelListComponent,
    FriendListComponent,
    ChatComponent,
    ChatHeaderComponent,
    ChatListComponent,
    ChatInputFormComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    StoreModule.forRoot({users : usersReducer, channels : channelsReducer}),
    EffectsModule.forRoot([MainEffects]),
    RouterModule
  ],
  providers: [MainService],
  bootstrap: [MainComponent]
})
export class MainModule { }
