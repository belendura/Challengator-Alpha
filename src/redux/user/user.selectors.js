import { createSelector } from "reselect";

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectUserFriends = createSelector(
  [selectCurrentUser],
  currentUser => (currentUser ? currentUser.friends : null)
);

export const selectUserPendingFriends = createSelector(
  [selectUserFriends],
  friends =>
    friends
      ? Object.values(friends.pending).reduce((accumulator, item) => {
          return (accumulator = [...accumulator, item]);
        }, [])
      : null
);

export const selectUserAcceptedFriends = createSelector(
  [selectUserFriends],
  friends =>
    friends
      ? Object.values(friends.accepted).reduce((accumulator, item) => {
          return (accumulator = [...accumulator, item]);
        }, [])
      : null
);
