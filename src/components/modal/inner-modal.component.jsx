import React, { Suspense } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { selectModalData } from "../../redux/modal/modal.selectors";
import { closeModal } from "../../redux/modal/modal.actions";

import ClickOutside from "../click-outside/click-outside.component";

import {
  InnerModalOuterContainer,
  InnerModalContainer
} from "./inner-modal.styles.jsx";

const ProposeChallenge = React.lazy(() =>
  import("../propose-challenge/propose-challenge.component")
);
const Alerts = React.lazy(() => import("../alerts/alerts.component"));
const ChallengeContenders = React.lazy(() =>
  import("../challenge-contenders/challenge-contenders.component")
);
const ChallengeRankingDetails = React.lazy(() =>
  import("../challenge-ranking-details/challenge-ranking-details.component")
);

const MODALS = {
  PROPOSE_CHALLENGE: ProposeChallenge,
  ALERTS: Alerts,
  CHALLENGE_CONTENDERS: ChallengeContenders,
  CHALLENGE_RANKING: ChallengeRankingDetails
};

const InnerModal = () => {
  const dispatch = useDispatch();

  const modalData = useSelector(selectModalData, shallowEqual);
  const CurrentModal = MODALS[modalData.modalType];
  return (
    <InnerModalOuterContainer>
      <ClickOutside action={() => dispatch(closeModal())}>
        <InnerModalContainer>
          <Suspense fallback={<div>Loading...</div>}>
            <CurrentModal {...modalData.modalProps} />
          </Suspense>
        </InnerModalContainer>
      </ClickOutside>
    </InnerModalOuterContainer>
  );
};

export default InnerModal;
