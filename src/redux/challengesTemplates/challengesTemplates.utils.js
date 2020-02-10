export const createIDChallenge = challengesTemplatesId => {
  let existingIdInstance = 0;
  let idInstance = 0;

  do {
    idInstance = randomID(20);

    existingIdInstance = challengesTemplatesId.some(
      challengeItem => challengeItem.idInstance === idInstance
    );
  } while (existingIdInstance);

  return idInstance;
};

const randomID = long => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let numberID = "";
  for (let i = 0; i < long; i++) {
    numberID += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return numberID;
};
