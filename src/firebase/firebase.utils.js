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
    const { email } = userAuth;
    const { displayName, age, gender, country, downloadURL } = additionalData;
    const createdAt = Date();
    try {
      await userRef.set({
        displayName,
        age,
        country,
        gender,
        photoUrl: downloadURL,
        email: email,
        createdAt: createdAt,
        id: userAuth.uid,
        providerId: "",
        challenges: {
          ability: [],
          heigth: [],
          foodie: [],
          travel: [],
          dancer: []
        },
        instancesToValidate: [],
        statistics: { globalRanking: 0 },
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

  const challengeSnapShot = await challengeInstancesRef.get();

  const challengeInstancesRefId = challengeSnapShot.id;

  try {
    contenders.forEach(async element => {
      const contendersRef = firestore.doc(`users/${element}`);
      const contendersSnapShot = await contendersRef.get();

      const challengeContenderData = contendersSnapShot.data();

      const currentChallenges = Object.entries(
        challengeContenderData.challenges
      ).reduce((accumulator, item) => {
        const [key, value] = item;
        if (key !== category) {
          accumulator[key] = value;
        }
        if (key === category) {
          value.push(challengeInstancesRefId);
          accumulator[key] = value;
        }
        return accumulator;
      }, {});

      await contendersRef.update({ challenges: currentChallenges });
    });
  } catch (error) {
    console.log("Error adding challenge Id to contender", error.message);
  }

  try {
    validators.forEach(async element => {
      const validatorsRef = firestore.doc(`users/${element}`);
      const validatorsSnapShot = await validatorsRef.get();

      const challengeValidatorData = validatorsSnapShot.data();

      const currentInstancesToValidate = Object.values(
        challengeValidatorData.instancesToValidate
      );

      currentInstancesToValidate.push(challengeInstancesRefId);

      await validatorsRef.update({
        instancesToValidate: currentInstancesToValidate
      });
    });
  } catch (error) {
    console.log("Error adding challenge Id to validator", error.message);
  }

  const newContenders = contenders.reduce((accumulator, item) => {
    return (accumulator = [
      ...accumulator,
      {
        contender: item,
        expirationTask: "",
        poster: "",
        comments: [
          {
            text: "",
            posterId: "",
            dateOfPost: new Date(),
            reportAbuse: false,
            commentId: ""
          }
        ],
        status: "accepted",
        proof: {
          url: "",
          uploadDate: new Date(),
          state: "",
          validatedBy: { id: "", reported: false }
        },
        public: false,
        rating: {
          likes: { likesSum: 0, likesUsers: [] },
          unlikes: { unlikesSum: 0, unlikesUsers: [] }
        },
        expiresAt: expirationDate(daysToComplete)
      }
    ]);
  }, []);

  const authorContender = {
    contender: author,
    expirationTask: "",
    poster: "",
    comments: [
      {
        text: "",
        posterId: "",
        dateOfPost: new Date(),
        reportAbuse: false,
        commentId: ""
      }
    ],
    status: "pending",
    proof: {
      url: "",
      uploadDate: new Date(),
      state: "",
      validatedBy: { id: "", reported: false }
    },
    public: false,
    rating: {
      likes: { likesSum: 0, likesUsers: [] },
      unlikes: { unlikesSum: 0, unlikesUsers: [] }
    },

    expiresAt: expirationDate(daysToComplete)
  };

  const challengeContenders = [...newContenders, authorContender];

  try {
    await challengeInstancesRef.set({
      instanceId: challengeInstancesRefId,
      templateId,
      administrator: author,
      contenders: challengeContenders,
      validators: validators,
      selfValidation: false
    });
  } catch (error) {
    console.log("Error creating challenge Instance", error.message);
    throw new Error(`Error storing challengeInstance ${error.message}`);
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
    rating: {
      likes: { likesSum: 0, likesUsers: [] },
      unlikes: { unlikesSum: 0, unlikesUsers: [] }
    },
    visualizations: 0,
    timesShared: 0,
    approved: false,
    author: author.id,
    category: category,
    name: title,
    description,
    posterUrl: downloadURL,
    posterUrl: "",
    proofFileType: "",
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

export const uploadUserPicture = async (
  user,
  userCredentials,
  dispatchedStorePictureStart
) => {
  const { fileObj } = userCredentials;
  console.log("fileObj in uplodUserPicture", fileObj);
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
      // dispatchedOpenModal({ alertText: "Error uploading Picture" });
      unsubscribe();
    },
    function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        dispatchedStorePictureStart(
          user,
          userCredentials,
          downloadURL
          // dispatchedOpenModal
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

export const updateLikesChallengeTemplates = async (
  templateId,
  category,
  user
) => {
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

export const updateUnlikesChallengeTemplates = async (
  templateId,
  category,
  user
) => {
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

export const updateLikesChallengeInstances = async (
  instanceId,
  contender,
  user
) => {
  const challengeInstanceRef = firestore.doc(
    `challengesInstances/${instanceId}`
  );

  const snapShot = await challengeInstanceRef.get();

  const challengeData = snapShot.data();

  const challengeInstanceRating = challengeData.contenders.find(item => {
    if (item.contender === contender) return item;
  });

  const likeFound = challengeInstanceRating.rating.likes.likesUsers.some(
    userItem => {
      return userItem === user.id;
    }
  );

  const unLikeFound = challengeInstanceRating.rating.unlikes.unlikesUsers.some(
    userItem => {
      return userItem === user.id;
    }
  );

  console.log("likeFound", likeFound);
  console.log("unLikeFound", unLikeFound);
  console.log("Likes");

  let updatedContender = {};

  const updatedLikeUsers = [...challengeInstanceRating.rating.likes.likesUsers];

  if (!likeFound) {
    updatedLikeUsers.push(user.id);

    updatedContender = {
      ...challengeInstanceRating,
      rating: {
        likes: {
          likesUsers: updatedLikeUsers,
          likesSum: challengeInstanceRating.rating.likes.likesSum + 1
        },
        unlikes: {
          unlikesUsers: challengeInstanceRating.rating.unlikes.unlikesUsers,
          unlikesSum: challengeInstanceRating.rating.unlikes.unlikesSum
        }
      }
    };
    if (unLikeFound) {
      const updatedUnlikeUsers = challengeInstanceRating.rating.unlikes.unlikesUsers.filter(
        userItem => {
          return userItem !== user.id;
        }
      );

      const updatedUnlikes = decreaseUnlikes(challengeInstanceRating.rating);

      updatedContender = {
        ...challengeInstanceRating,
        rating: {
          likes: {
            likesUsers: challengeInstanceRating.rating.likes.likesUsers,
            likesSum: challengeInstanceRating.rating.likes.likesSum
          },
          unlikes: {
            unlikesUsers: updatedUnlikeUsers,
            unlikesSum: updatedUnlikes
          }
        }
      };
    }
  } else if (likeFound) {
    const updatedLikes = decreaseLikes(challengeInstanceRating.rating);
    const updatedLikeUsers = challengeInstanceRating.rating.likes.likesUsers.filter(
      userItem => {
        return userItem !== user.id;
      }
    );
    updatedContender = {
      ...challengeInstanceRating,
      rating: {
        likes: {
          likesUsers: updatedLikeUsers,
          likesSum: updatedLikes
        },
        unlikes: {
          unlikesUsers: challengeInstanceRating.rating.unlikes.unlikesUsers,
          unlikesSum: challengeInstanceRating.rating.unlikes.unlikesSum
        }
      }
    };
  }
  const oldContenders = challengeData.contenders.filter(item => {
    return item.contender !== contender;
  });

  try {
    const newContenders = [...oldContenders, updatedContender];
    console.log("oldContenders", oldContenders);
    console.log("updatedContender", updatedContender);
    await challengeInstanceRef.update({
      contenders: newContenders
    });

    return { ...challengeData, contenders: newContenders };
  } catch (error) {
    console.log("Error increasing likes", error.message);
  }
};

export const updateUnlikesChallengeInstances = async (
  instanceId,
  contender,
  user
) => {
  const challengeInstanceRef = firestore.doc(
    `challengesInstances/${instanceId}`
  );

  const snapShot = await challengeInstanceRef.get();

  const challengeData = snapShot.data();

  const challengeInstanceRating = challengeData.contenders.find(item => {
    if (item.contender === contender) return item;
  });

  const likeFound = challengeInstanceRating.rating.likes.likesUsers.some(
    userItem => {
      return userItem === user.id;
    }
  );

  const unLikeFound = challengeInstanceRating.rating.unlikes.unlikesUsers.some(
    userItem => {
      return userItem === user.id;
    }
  );

  console.log("likeFound", likeFound);
  console.log("unLikeFound", unLikeFound);
  console.log("Unlikes");

  let updatedContender = {};

  const updatedUnlikeUsers = [
    ...challengeInstanceRating.rating.unlikes.unlikesUsers
  ];

  if (!unLikeFound) {
    updatedUnlikeUsers.push(user.id);
    console.log("updatedUnlikeUsers", updatedUnlikeUsers);
    console.log("challengeInstanceRating", challengeInstanceRating);
    updatedContender = {
      ...challengeInstanceRating,
      rating: {
        likes: {
          likesUsers: challengeInstanceRating.rating.likes.likesUsers,
          likesSum: challengeInstanceRating.rating.likes.likesSum
        },
        unlikes: {
          unlikesUsers: updatedUnlikeUsers,
          unlikesSum: challengeInstanceRating.rating.unlikes.unlikesSum + 1
        }
      }
    };
    console.log("unlikes unlikes 1", challengeInstanceRating.rating.unlikes);
    if (likeFound) {
      const updatedLikeUsers = challengeInstanceRating.rating.likes.likesUsers.filter(
        userItem => {
          return userItem !== user.id;
        }
      );

      const updatedLikes = decreaseLikes(challengeInstanceRating.rating);

      updatedContender = {
        ...challengeInstanceRating,
        rating: {
          likes: {
            likesUsers: updatedLikeUsers,
            likesSum: updatedLikes
          },
          unlikes: {
            unlikesUsers: challengeInstanceRating.rating.unlikes.unlikesUsers,
            unlikesSum: challengeInstanceRating.rating.unlikes.unlikesSum
          }
        }
      };
    }
    console.log("unlikes unlikes 2", challengeInstanceRating.rating.unlikes);
  } else if (unLikeFound) {
    const updatedUnlikes = decreaseUnlikes(challengeInstanceRating.rating);
    const updatedUnlikeUsers = challengeInstanceRating.rating.unlikes.unlikesUsers.filter(
      userItem => {
        return userItem !== user.id;
      }
    );
    updatedContender = {
      ...challengeInstanceRating,
      rating: {
        likes: {
          likesUsers: challengeInstanceRating.rating.likes.likesUsers,
          likesSum: challengeInstanceRating.rating.likes.likesSum
        },
        unlikes: {
          unlikesUsers: updatedUnlikeUsers,
          unlikesSum: updatedUnlikes
        }
      }
    };
  }
  const oldContenders = challengeData.contenders.filter(item => {
    return item.contender !== contender;
  });

  try {
    const newContenders = [...oldContenders, updatedContender];

    console.log("oldContenders", oldContenders);
    console.log("updatedContender", updatedContender);

    await challengeInstanceRef.update({
      contenders: newContenders
    });

    return { ...challengeData, contenders: newContenders };
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
