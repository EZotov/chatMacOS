import { createAction, props } from '@ngrx/store';
import { User, Channel, Message } from '../enteties/enteties';

export const loginUser = createAction(
  '[User] Login  user',
  props<{loginUser : User}>()
);

export const loadUsers = createAction(
  '[Users] Load Users',
);

export const loadUsersSuccess = createAction(
  '[Users] Success Load Users',
  props<{users : User[]}>()
);

export const loadChannels = createAction(
  '[Channels] Load Channels',
);

export const loadChannelsSuccess = createAction(
  '[Channels] Success Load Channels',
  props<{channels : Channel[]}>()
);

export const openProfile = createAction(
  '[Profile] Open profile',
  props<{selectedProfile : User}>()
);

export const closeProfile = createAction(
  '[Profile] Close profile'
);

export const sendMessage = createAction(
  '[Chat] Send message',
  props<{channel : Channel, message : Message}>()
);

export const searchAction = createAction(
  '[Chat] Search messages',
  props<{searchText : string}>()
)
