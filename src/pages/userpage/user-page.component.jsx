import React, { useEffect, useState } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";

import { fetchChallengesInstanceStart } from "../../redux/challengesInstances/challengesInstances.actions";
import { fetchUsersStart } from "../../redux/users/users.actions";

import {
  selectChallengesInstancesFetching,
  selectChallengeInstance,
  selectPendingChallengesInstance,
  selectCompletedChallengesInstance
} from "../../redux/challengesInstances/challengesInstances.selectors";

import {
  selectUsersObj,
  selectUsersFetching,
  selectUsersOwnFriends
} from "../../redux/users/users.selectors";

import {
  selectCurrentUser,
  selectUserPendingFriends,
  selectUserAcceptedFriends
} from "../../redux/user/user.selectors";

import ChallengeInstance from "../../components/challenge-instance/challenge-instance.component";
import UserChallenges from "../../components/user-challenges/user-challenges.component";
import SearchBox from "../../components/search-box/search-box.component";
import UsersDropDown from "../../components/users-dropdown/users-dropdown.component";
import Friends from "../../components/friends/friends.component";
import AcceptedFriends from "../../components/accepted-friends/accepted-friends.component";

import { UserPageContainer, UserPageItems } from "./user-page.styles.jsx";

const selectChallengeInstancesData = createStructuredSelector({
  isFetching: selectChallengesInstancesFetching,
  challengeInstance: selectChallengeInstance,
  usersIsFetching: selectUsersFetching,
  users: selectUsersObj,
  currentUser: selectCurrentUser,
  pendingFriends: selectUserPendingFriends,
  acceptedFriends: selectUserAcceptedFriends
});

const UserPage = () => {
  const placeHolder = "Search Friends";

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userSearch, setSearch] = useState("");

  const dispatch = useDispatch();

  const {
    isFetching,
    challengeInstance,
    usersIsFetching,
    users,
    currentUser,
    pendingFriends,
    acceptedFriends
  } = useSelector(selectChallengeInstancesData, shallowEqual);

  const selectedPendingChallenges = useSelector(
    state => selectPendingChallengesInstance(state, currentUser),
    shallowEqual
  );

  const selectedCompletedChallenges = useSelector(
    state => selectCompletedChallengesInstance(state, currentUser),
    shallowEqual
  );

  const selectedUsersPendingFriends = useSelector(
    state => selectUsersOwnFriends(state, pendingFriends),
    shallowEqual
  );

  const selectedUsersAcceptedFriends = useSelector(
    state => selectUsersOwnFriends(state, acceptedFriends),
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchChallengesInstanceStart());
    dispatch(fetchUsersStart());
  }, [fetchUsersStart, dispatch]);

  useEffect(() => {
    if (usersIsFetching || !currentUser) {
      return;
    } else {
      const filteredUsers = Object.entries(users).reduce(
        (accumulator, userItem) => {
          const [id, data] = userItem;
          if (
            data.userData.displayName
              .toLowerCase()
              .includes(userSearch.toLowerCase()) &&
            id !== currentUser.id
          ) {
            const item = {
              id,
              data
            };
            accumulator = [...accumulator, item];
          }
          return accumulator;
        },
        []
      );

      setFilteredUsers(filteredUsers);
    }
  }, [userSearch, users, currentUser, usersIsFetching]);

  const handleChange = event => {
    setSearch(event.target.value);
  };

  return (
    <UserPageContainer>
      <div>
        SEARCH FRIENDS
        <SearchBox placeHolder={placeHolder} handleChange={handleChange} />
        <UsersDropDown filteredUsers={filteredUsers} />
      </div>
      <div>
        PENDING FRIENDS
        {selectedUsersPendingFriends ? (
          <Friends friends={selectedUsersPendingFriends} />
        ) : null}
      </div>
      <div>
        ACCEPTED FRIENDS
        {selectedUsersAcceptedFriends ? (
          <AcceptedFriends friends={selectedUsersAcceptedFriends} />
        ) : null}
      </div>
      <UserPageItems>
        {challengeInstance !== {} ? (
          <ChallengeInstance challengeInstance={challengeInstance} />
        ) : (
          <span>No Challenge Accepted</span>
        )}
      </UserPageItems>
      <UserPageItems>
        PENDING CHALLENGES
        {isFetching && currentUser ? null : (
          <UserChallenges selectedChallenges={selectedPendingChallenges} />
        )}
      </UserPageItems>
      <UserPageItems>
        COMPLETED CHALLENGES
        {isFetching && currentUser ? null : (
          <UserChallenges selectedChallenges={selectedCompletedChallenges} />
        )}
      </UserPageItems>
    </UserPageContainer>
  );
};

export default UserPage;
