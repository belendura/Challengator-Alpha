import { createSelector } from "reselect";

const selectChallengesTemplates = state => state.challengesTemplates;

export const selectChallengesTemplatesCategories = createSelector(
  [selectChallengesTemplates],
  challengesTemplates =>
    challengesTemplates
      ? Object.keys(challengesTemplates.challengesTemplatesCategories)
      : []
);

export const selectChallengesTemplatesFetching = createSelector(
  [selectChallengesTemplates],
  challengesTemplates => challengesTemplates.isFetching
);

export const selectChallengesTemplatesByCategory = category =>
  createSelector([selectChallengesTemplates], challengesTemplates =>
    challengesTemplates.challengesTemplatesCategories[category]
      ? challengesTemplates.challengesTemplatesCategories[category].challenges
      : []
  );

export const selectCurrentCategory = createSelector(
  [selectChallengesTemplates],
  challengesTemplates => challengesTemplates.selectedCategory
);

export const selectChallengesTemplatesId = createSelector(
  [selectChallengesTemplates],
  challengesTemplates =>
    challengesTemplates
      ? Object.values(challengesTemplates.challengesTemplatesCategories).reduce(
          (accumulator, category) => {
            if (category.challenges.length) {
              category.challenges.forEach(item => {
                accumulator.push(item.templateId);
              });
            }
            return accumulator;
          },
          []
        )
      : []
);
