import React, { useState, useEffect } from "react";

import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { selectUserAcceptedFriends } from "../../redux/user/user.selectors";
import { selectUsersOwnFriends } from "../../redux/users/users.selectors";

import { storeChallengeInstanceStart } from "../../redux/challengesInstances/challengesInstances.actions";
import { fetchUsersStart } from "../../redux/users/users.actions";

import SelectFriends from "../select-friends/select-friends.component";
import CustomButton from "../custom-button/custom-button.component";

import { ChallengeContainer } from "./challenge-contenders.styles.jsx";

const ChallengeContenders = ({ challenge }) => {
  const [data, setData] = useState({
    contenders: [],
    validators: []
  });

  const { contenders, validators } = data;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersStart());
  }, [fetchUsersStart, dispatch]);

  const acceptedFriends = useSelector(selectUserAcceptedFriends, shallowEqual);

  const selectedUsersAcceptedFriends = useSelector(
    state => selectUsersOwnFriends(state, acceptedFriends),
    shallowEqual
  );

  const handleChange = event => {
    const result = getValue(event.target);
    const { name } = event.target;

    setData({ ...data, [name]: result });
  };

  const getValue = select => {
    const result = [];
    const options = select && select.selectedOptions;

    for (const option of options) {
      result.push(option.value);
    }

    return result;
  };

  return (
    <ChallengeContainer>
      <span>contenders</span>
      <SelectFriends
        players="contenders"
        friends={selectedUsersAcceptedFriends}
        handleChange={handleChange}
      />
      <span>validators</span>
      <SelectFriends
        players="validators"
        friends={selectedUsersAcceptedFriends}
        handleChange={handleChange}
      />
      <CustomButton
        onClick={() =>
          dispatch(
            storeChallengeInstanceStart(challenge, contenders, validators)
          )
        }
      >
        Create Challenge
      </CustomButton>
    </ChallengeContainer>
  );
};

export default ChallengeContenders;
