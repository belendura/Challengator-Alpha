import { createSelector } from "reselect";

const selectUsers = state => state.users;

export const selectUsersObj = createSelector(
  [selectUsers],
  users => users.users
);

export const selectUsersFetching = createSelector(
  [selectUsers],
  users => users.isFetching
);

export const selectUsersPendingFriends = createSelector(
  [selectUsersObj, (_, currentUser) => currentUser],
  (users, currentUser) =>
    users && currentUser
      ? Object.entries(users).reduce((accumulator, item) => {
          const [key, value] = item;
          const exists = value.friends.pending.some(element => {
            return element === currentUser.id;
          });
          if (exists) {
            accumulator.push({ key, value: value.userData.displayName });
          }
          return accumulator;
        }, [])
      : null
);

export const selectUsersOwnFriends = createSelector(
  [selectUsersObj, (_, friends) => friends],
  (users, friends) =>
    users && friends
      ? Object.entries(users).reduce((accumulator, item) => {
          const [key, value] = item;
          friends.forEach(element => {
            if (element === key) {
              return accumulator.push({
                key,
                name: value.userData.displayName
              });
            }
          });
          return accumulator;
        }, [])
      : null
);

export const selectUsersByTemplateId = createSelector(
  [selectUsersObj, (_, templateId) => templateId],
  (users, templateId) =>
    users && templateId
      ? Object.entries(users).reduce((accumulator, item) => {
          const [key, value] = item;
          templateId.forEach(element => {
            if (element.contenderId === key) {
              return accumulator.push({
                ...element,
                name: value.userData.displayName
              });
            }
          });
          return accumulator;
        }, [])
      : null
);
