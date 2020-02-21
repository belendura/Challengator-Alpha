import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyDcLfGxwdtinaA7VnOCKjFaJECXsA_kPtU",
  authDomain: "challengator-e3ef1.firebaseapp.com",
  databaseURL: "https://challengator-e3ef1.firebaseio.com",
  projectId: "challengator-e3ef1",
  storageBucket: "challengator-e3ef1.appspot.com",
  messagingSenderId: "266986901312",
  appId: "1:266986901312:web:803fa34e25f79ece23f4a5"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = Date();
    try {
      await userRef.set({
        userData: {
          displayName,
          email,
          createdAt,
          id: userAuth.uid,
          ...additionalData
        },
        challenges: {
          ability: [],
          heigth: [],
          foodie: [],
          travel: [],
          dancer: []
        },
        instancesToValidate: [],
        statistics: { ranking: 0 },
        friends: { accepted: [], pending: [] },
        globalValidator: {
          status: "No validator",
          instancesValidated: 0
        }
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};

const expirationDate = daysToComplete => {
  const date = new Date();
  return date.setDate(date.getDate() + daysToComplete);
};

export const createChallengeInstanceDocument = async (
  challengeInstance,
  contenders,
  validators
) => {
  const {
    templateId,
    name,
    author,
    daysToComplete,
    category
  } = challengeInstance;

  const challengeInstancesRef = firestore
    .collection(`challengesInstances`)
    .doc();

  const callengeSnapShot = await challengeInstancesRef.get();
  const challengeInstancesRefId = callengeSnapShot.id;

  try {
    contenders.forEach(async element => {
      const contendersRef = firestore.doc(`users/${element}`);
      const contendersSnapShot = await contendersRef.get();

      const challengeContenderData = contendersSnapShot.data();
      const categoryChallenge =
        challengeContenderData.challenges[`${category}`];
      categoryChallenge.push(challengeInstancesRefId);
    });
  } catch (error) {
    console.log("Error adding challenge Id to contender", error.message);
  }

  try {
    validators.forEach(async element => {
      const validatorsRef = firestore.doc(`users/${element}`);
      const validatorsSnapShot = await validatorsRef.get();

      const challengeValidatorData = validatorsSnapShot.data();
      const instancesToValidate = challengeValidatorData.instancesToValidate;
      instancesToValidate.push(challengeInstancesRefId);
    });
  } catch (error) {
    console.log("Error adding challenge Id to validator", error.message);
  }

  const newContenders = contenders.reduce((accumulator, item) => {
    return (accumulator = [
      ...accumulator,
      {
        contender: item,
        status: "accepted",
        proof: {
          url: "",
          uploadDate: "",
          state: "",
          validatedBy: { id: "", reported: false }
        },
        expiresAt: ""
      }
    ]);
  }, []);

  const authorContender = {
    contender: author.id,
    status: "pending",
    proof: {
      url: "",
      uploadDate: "",
      state: "",
      validatedBy: { id: "", reported: false }
    },
    expiresAt: expirationDate(daysToComplete)
  };

  const challengeContenders = [...newContenders, authorContender];

  try {
    await challengeInstancesRef.set({
      templateId,
      name: name,
      administrator: author.id,
      contenders: challengeContenders,
      validators: validators,
      comments: [],
      rating: { likes: 0, dislikes: 0, votes: [], pendingVotes: [] },
      public: false,
      selfValidation: false
    });
  } catch (error) {
    console.log("Error creating challenge Instance", error.message);
  }
};

export const createChallengeTemplateDocument = async (
  challengeCredentials,
  downloadURL,
  templateId
) => {
  const { title, description, author, category } = challengeCredentials;

  const challengeTemplatesRef = firestore.doc(
    `challengesTemplates/${category}`
  );

  const snapShot = await challengeTemplatesRef.get();

  const categoryData = snapShot.data();

  const categoryChallenges = categoryData.challenges;

  const challengeToAdd = {
    daysToComplete: 0,
    difficulty: "",
    minimumParticipants: 1,
    ranking: "",
    rating: "",
    likes: { likesSum: 0, likesUsers: [] },
    unlikes: { unlikesSum: 0, unlikesUsers: [] },
    visualizations: 0,
    timesShared: 0,
    approved: false,
    author: author,
    category: category,
    name: title,
    description,
    url: downloadURL,
    templateId
  };

  const categoryChallengesUpdated = [...categoryChallenges, challengeToAdd];

  try {
    await challengeTemplatesRef.update({
      challenges: categoryChallengesUpdated
    });
  } catch (error) {
    console.log("Error storing challenge template", error.message);
    throw new Error(`Error storing challengeTemplate ${error.message}`);
  }
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(element => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, element);
  });

  return await batch.commit();
};

export const addFriend = async (user, friend) => {
  const friendRef = firestore.doc(`users/${friend}`);
  const snapShot = await friendRef.get();

  if (snapShot.exists) {
    const data = snapShot.data();
    const friends = data.friends;
    const pendingFriends = friends.pending;
    const acceptedFriends = friends.accepted;
    const exists = pendingFriends.some(item => {
      return item === user;
    });
    if (exists) {
      return;
    } else {
      try {
        const newPendingFriends = [...pendingFriends, user];
        await friendRef.update({
          friends: { accepted: acceptedFriends, pending: newPendingFriends }
        });
      } catch (error) {
        console.log("Error adding friend", error.message);
      }
    }
  }
};

export const acceptFriend = async (user, friend) => {
  const friendRef = firestore.doc(`users/${friend}`);
  const friendSnapShot = await friendRef.get();

  const userRef = firestore.doc(`users/${user}`);
  const userSnapShot = await userRef.get();

  if (friendSnapShot.exists) {
    const data = friendSnapShot.data();
    const friends = data.friends;
    const pendingFriends = friends.pending;
    const acceptedFriends = friends.accepted;
    const newPendingFriends = pendingFriends.filter(item => {
      return item !== user;
    });
    const friendExists = acceptedFriends.some(item => {
      return item === user;
    });
    if (!friendExists) {
      const newAcceptedFriends = [...acceptedFriends, user];
      try {
        await friendRef.update({
          friends: { accepted: newAcceptedFriends, pending: newPendingFriends }
        });
      } catch (error) {
        console.log("Error accepting friend", error.message);
      }
    }
  }

  if (userSnapShot.exists) {
    const data = userSnapShot.data();
    const friends = data.friends;
    const pendingFriends = friends.pending;
    const acceptedFriends = friends.accepted;
    const newPendingFriends = pendingFriends.filter(item => {
      return item !== friend;
    });
    const friendExists = acceptedFriends.some(item => {
      return item === friend;
    });
    if (!friendExists) {
      const newAcceptedFriends = [...acceptedFriends, friend];
      try {
        await userRef.update({
          friends: { accepted: newAcceptedFriends, pending: newPendingFriends }
        });
      } catch (error) {
        console.log("Error accepting friend", error.message);
      }
    }
  }
};

export const deleteFriend = async (user, friend) => {
  const friendRef = firestore.doc(`users/${friend}`);
  const friendSnapShot = await friendRef.get();

  const userRef = firestore.doc(`users/${user}`);
  const userSnapShot = await userRef.get();

  if (friendSnapShot.exists) {
    const data = friendSnapShot.data();
    const friends = data.friends;
    const pendingFriends = friends.pending;
    const acceptedFriends = friends.accepted;
    const friendExists = acceptedFriends.some(item => {
      return item === user;
    });
    if (friendExists) {
      const newAcceptedFriends = acceptedFriends.filter(item => {
        return item !== user;
      });
      try {
        await friendRef.update({
          friends: { accepted: newAcceptedFriends, pending: pendingFriends }
        });
      } catch (error) {
        console.log("Error deleting friend", error.message);
      }
    }
  }

  if (userSnapShot.exists) {
    const data = userSnapShot.data();
    const friends = data.friends;
    const pendingFriends = friends.pending;
    const acceptedFriends = friends.accepted;
    const friendExists = acceptedFriends.some(item => {
      return item === friend;
    });
    if (friendExists) {
      const newAcceptedFriends = acceptedFriends.filter(item => {
        return item !== friend;
      });
      try {
        await userRef.update({
          friends: { accepted: newAcceptedFriends, pending: pendingFriends }
        });
      } catch (error) {
        console.log("Error deleting friend", error.message);
      }
    }
  }
};

export const convertUsersSnapshotToMap = collections => {
  const transformedCollection = collections.docs.reduce((accumulator, doc) => {
    accumulator[doc.id] = doc.data();
    return accumulator;
  }, {});
  return transformedCollection;
};

export const convertChallengesSnapshotToMap = collections => {
  const transformedCollection = collections.docs.reduce((accumulator, doc) => {
    const { challenges } = doc.data();
    accumulator[doc.id] = { challenges: [] };
    challenges.forEach(item => {
      accumulator[doc.id].challenges = [
        ...accumulator[doc.id].challenges,
        { ...item }
      ];
    });
    return accumulator;
  }, {});
  return transformedCollection;
};

export const convertChallengesInstanceSnapshotToMap = collections => {
  const transformedCollection = collections.docs.reduce((accumulator, doc) => {
    accumulator[doc.id] = doc.data();
    return accumulator;
  }, {});
  return transformedCollection;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const uploadFile = async ({
  challengeCredentials,
  dispatchedStoreChallengeStart,
  challengesTemplatesId,
  dispatchedOpenModal
}) => {
  const { fileObj } = challengeCredentials;
  var storageRef = firebase
    .storage()
    .ref("images/")
    .child(fileObj.name);
  var uploadTask = storageRef.put(fileObj);
  const unsubscribe = uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
        default:
          break;
      }
    },
    function(error) {
      console.log("Error al subir el archivo", error);
      dispatchedOpenModal({ alertText: "Error uploading File" });
      unsubscribe();
    },
    function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        dispatchedStoreChallengeStart(
          challengeCredentials,
          downloadURL,
          challengesTemplatesId,
          dispatchedOpenModal
        );
        unsubscribe();
      });
    }
  );
};

const decreaseUnlikes = challengeTemplate => {
  return challengeTemplate.unlikes.unlikesSum > 0
    ? challengeTemplate.unlikes.unlikesSum - 1
    : (challengeTemplate.unlikes.unlikesSum = 0);
};

const decreaseLikes = challengeTemplate => {
  return challengeTemplate.likes.likesSum > 0
    ? challengeTemplate.likes.likesSum - 1
    : (challengeTemplate.likes.likesSum = 0);
};

export const updateLikes = async (templateId, category, user) => {
  const challengeTemplatesCategoryRef = firestore.doc(
    `challengesTemplates/${category}`
  );

  const snapShot = await challengeTemplatesCategoryRef.get();

  const challengeData = snapShot.data();

  const challengeTemplate = challengeData.challenges.find(item => {
    return item.templateId === templateId;
  });

  const likeFound = challengeTemplate.likes.likesUsers.some(userItem => {
    return userItem === user.id;
  });

  const unLikeFound = challengeTemplate.unlikes.unlikesUsers.some(userItem => {
    return userItem === user.id;
  });

  let updatedChallenge = {};

  const updatedLikeUsers = [...challengeTemplate.likes.likesUsers];

  if (!likeFound) {
    updatedLikeUsers.push(user.id);

    updatedChallenge = {
      ...challengeTemplate,
      likes: {
        likesUsers: updatedLikeUsers,
        likesSum: challengeTemplate.likes.likesSum + 1
      }
    };
    if (unLikeFound) {
      const updatedUnlikeUsers = challengeTemplate.unlikes.unlikesUsers.filter(
        userItem => {
          return userItem !== user.id;
        }
      );
      const updatedUnlikes = decreaseUnlikes(challengeTemplate);

      updatedChallenge = {
        ...updatedChallenge,
        unlikes: {
          unlikesUsers: updatedUnlikeUsers,
          unlikesSum: updatedUnlikes
        }
      };
    }
  } else if (likeFound) {
    const updatedLikes = decreaseLikes(challengeTemplate);
    const updatedLikeUsers = challengeTemplate.likes.likesUsers.filter(
      userItem => {
        return userItem !== user.id;
      }
    );
    updatedChallenge = {
      ...challengeTemplate,
      likes: {
        likesUsers: updatedLikeUsers,
        likesSum: updatedLikes
      }
    };
  }
  const oldChallenges = challengeData.challenges.filter(item => {
    return item.templateId !== templateId;
  });

  try {
    const newChallenges = [...oldChallenges, updatedChallenge];

    await challengeTemplatesCategoryRef.update({
      challenges: newChallenges
    });

    return { challenges: newChallenges };
  } catch (error) {
    console.log("Error increasing likes", error.message);
  }
};

export const updateUnlikes = async (templateId, category, user) => {
  const challengeTemplatesCategoryRef = firestore.doc(
    `challengesTemplates/${category}`
  );

  const snapShot = await challengeTemplatesCategoryRef.get();

  const challengeData = snapShot.data();

  const challengeTemplate = challengeData.challenges.find(item => {
    return item.templateId === templateId;
  });

  const likeFound = challengeTemplate.likes.likesUsers.some(userItem => {
    return userItem === user.id;
  });

  const unLikeFound = challengeTemplate.unlikes.unlikesUsers.some(userItem => {
    return userItem === user.id;
  });

  let updatedChallenge = {};
  const updatedUnlikeUsers = [...challengeTemplate.unlikes.unlikesUsers];

  if (!unLikeFound) {
    updatedUnlikeUsers.push(user.id);
    updatedChallenge = {
      ...challengeTemplate,
      unlikes: {
        unlikesUsers: updatedUnlikeUsers,
        unlikesSum: challengeTemplate.unlikes.unlikesSum + 1
      }
    };
    if (likeFound) {
      const updatedLikeUsers = challengeTemplate.likes.likesUsers.filter(
        userItem => {
          return userItem !== user.id;
        }
      );
      const updatedLikes = decreaseLikes(challengeTemplate);

      updatedChallenge = {
        ...updatedChallenge,
        likes: {
          likesUsers: updatedLikeUsers,
          likesSum: updatedLikes
        }
      };
    }
  } else if (unLikeFound) {
    const updatedUnlikes = decreaseUnlikes(challengeTemplate);
    const updatedUnlikeUsers = challengeTemplate.unlikes.unlikesUsers.filter(
      userItem => {
        return userItem !== user.id;
      }
    );

    updatedChallenge = {
      ...challengeTemplate,
      unlikes: {
        unlikesUsers: updatedUnlikeUsers,
        unlikesSum: updatedUnlikes
      }
    };
  }

  const oldChallenges = challengeData.challenges.filter(item => {
    return item.templateId !== templateId;
  });

  try {
    const newChallenges = [...oldChallenges, updatedChallenge];

    await challengeTemplatesCategoryRef.update({
      challenges: newChallenges
    });

    return { challenges: newChallenges };
  } catch (error) {
    console.log("Error increasing unlikes", error.message);
  }
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
