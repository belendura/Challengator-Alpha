import { createSelector } from "reselect";

const selectChallengesInstances = state => state.challengesInstances;

export const selectChallengeInProgress = createSelector(
  [selectChallengesInstances],
  challengesInstances => challengesInstances.challenge_in_progress
);

export const selectChallengesInstancesFetching = createSelector(
  [selectChallengesInstances],
  challengesInstances => challengesInstances.isFetching
);

export const selectChallengeInstance = createSelector(
  [selectChallengesInstances],
  challengesInstances => challengesInstances.challenge_instance
);

export const selectChallengesInstanceByContender = createSelector(
  [selectChallengesInstances, (_, contender) => contender],
  (challengesInstances, contender) =>
    challengesInstances && contender
      ? Object.values(challengesInstances.challenges).filter(item => {
          return item.contenders.some(contenderItem => {
            return contenderItem.contender === contender.id;
          });
        })
      : []
);

export const selectPendingChallengesInstance = createSelector(
  [selectChallengesInstances, (_, contender) => contender],
  (challengesInstances, contender) =>
    challengesInstances && contender
      ? Object.values(challengesInstances.challenges).filter(item => {
          return item.contenders.some(contenderItem => {
            return (
              contenderItem.contender === contender.id &&
              contenderItem.status === "pending"
            );
          });
        })
      : []
);

export const selectCompletedChallengesInstance = createSelector(
  [selectChallengesInstances, (_, contender) => contender],
  (challengesInstances, contender) =>
    challengesInstances && contender
      ? Object.values(challengesInstances.challenges).filter(item => {
          return item.contenders.some(contenderItem => {
            return (
              contenderItem.contender === contender.id &&
              contenderItem.status === "completed"
            );
          });
        })
      : []
);
