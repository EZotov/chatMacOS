import { createReducer, on } from '@ngrx/store';
import { User, Channel, Message } from '../enteties/enteties';
import { loadUsersSuccess, loadChannelsSuccess, openProfile, closeProfile, loginUser, sendMessage, searchAction } from '../store/app.actions';

export interface usersState {
  users : User[],
  openedProfile : boolean,
  selectedProfile : User,
  loginUser : User
}

export interface channelsState {
  channels : Channel[],
  searchText : string
}

export interface State {
  users : usersState,
  channels : channelsState
}

const defaultUser : User = {
  userName : '',
  name : '',
  status : '',
  jobTitle : '',
  mail : '',
  skype : '',
  timezone : '',
  photo : ''
}

const initialUsersState : usersState = {
  users : [],
  openedProfile : false,
  selectedProfile : defaultUser,
  loginUser : defaultUser
};

const initialChannelsState : channelsState = {
  channels : [],
  searchText : ''
};

export const usersReducer = createReducer(
  initialUsersState,
  on(loginUser, (state, action) => {
    return {
      users : state.users,
      openedProfile : state.openedProfile,
      selectedProfile : state.selectedProfile,
      loginUser : action.loginUser
    }
  }),
  on(loadUsersSuccess, (state, action) => {
    return {
      users : [...action.users],
      openedProfile : state.openedProfile,
      selectedProfile : state.selectedProfile,
      loginUser : state.loginUser
    }
  }),
  on(openProfile, (state, action) => {
    return {
      users : state.users,
      openedProfile : true,
      selectedProfile : action.selectedProfile,
      loginUser : state.loginUser
    }
  }),
  on(closeProfile, (state, action) => {
    return {
      users : state.users,
      openedProfile : false,
      selectedProfile : state.selectedProfile,
      loginUser : state.loginUser
    }
  })
)

export const channelsReducer = createReducer(
  initialChannelsState,
  on(loadChannelsSuccess, (state, action) => {
    return {
      channels : [...action.channels],
      searchText : state.searchText
    }
  }),
  on(sendMessage, (state, action) => {
    // Добавление сообщения
    let channel : Channel = {...action.channel};
    let updatedMessageList : Message[] = [...channel.messages, action.message];
    channel.messages = updatedMessageList;

    let newChannelList = state.channels.map((channelItem : Channel) => {
      if (channelItem.title === channel.title) {
        return channel
      }
      else {
        return channelItem;
      }
    });

    return {
      channels : newChannelList,
      searchText : state.searchText
    }
  }),
  on(searchAction, (state, action) => {
    return {
      channels : state.channels,
      searchText : action.searchText
    }
  })
)
