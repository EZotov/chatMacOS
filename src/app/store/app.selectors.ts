import { createSelector, createFeatureSelector } from '@ngrx/store';
import { usersState, channelsState } from './app.reducers';


const featureUsersSelector = createFeatureSelector<usersState>('users');
const featureChannelsSelector = createFeatureSelector<channelsState>('channels');

export const usersSelector = createSelector(
  featureUsersSelector,
  (state) => state.users
);

export const selectedProfileSelector = createSelector(
  featureUsersSelector,
  (state) => {
    return {
      openedProfile : state.openedProfile,
      selectedProfile : state.selectedProfile
    }
  }
);

export const loginUserSelector = createSelector(
  featureUsersSelector,
  (state) => {
    return state.loginUser
  }
);

export const channelsSelector = createSelector(
  featureChannelsSelector,
  (state) => state.channels
);

export const firsChannelSelector = createSelector(
    featureChannelsSelector,
    (state) => {
      if (state.channels.length) {
        return state.channels[0];
      }
      else {
        return null;
      }
    }
)

export const searchTextSelector = createSelector(
  featureChannelsSelector,
  (state) => state.searchText
);
