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
      ? Object.values(challengesInstances.challenges).reduce(
          (accumulator, item) => {
            item.contenders.forEach(contenderItem => {
              if (contenderItem.contender === contender) accumulator = item;
            });
            return accumulator;
          },
          {}
        )
      : []
);

export const selectChallengeInstanceId = createSelector(
  [selectChallengesInstances, (_, instanceId) => instanceId],
  (challengesInstances, instanceId) =>
    challengesInstances && instanceId
      ? Object.entries(challengesInstances.challenges).reduce(
          (accumulator, item) => {
            const [key, value] = item;
            if (key === instanceId) {
              accumulator = value;
            }
            return accumulator;
          },
          {}
        )
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

export const selectChallengesInstanceByTemplateId = createSelector(
  [selectChallengesInstances, (_, templateId) => templateId],
  (challengesInstances, templateId) =>
    challengesInstances && templateId
      ? Object.values(challengesInstances.challenges).reduce(
          (accumulator, item) => {
            if (item.templateId === templateId) {
              item.contenders.forEach(contenderItem => {
                if (
                  !contenderItem.public &&
                  contenderItem.status === "accepted"
                )
                  return accumulator.push({
                    instanceId: item.instanceId,
                    contenderId: contenderItem.contender,
                    rating: contenderItem.rating,
                    url: contenderItem.proof.url
                  });
              });
            }

            return accumulator;
          },
          []
        )
      : []
);
