import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { selectModalData } from "../../redux/modal/modal.selectors";
import { closeModal } from "../../redux/modal/modal.actions";

import ProposeChallenge from "../propose-challenge/propose-challenge.component";
import Alerts from "../alerts/alerts.component";
import ClickOutside from "../click-outside/click-outside.component";

import {
  InnerModalOuterContainer,
  InnerModalContainer
} from "./inner-modal.styles.jsx";

const MODALS = {
  PROPOSE_CHALLENGE: ProposeChallenge,
  ALERTS: Alerts
};

const InnerModal = () => {
  const dispatch = useDispatch();

  const modalData = useSelector(selectModalData, shallowEqual);
  const CurrentModal = MODALS[modalData.modalType];
  return (
    <div className="inner-modal-outer-container">
      <ClickOutside action={() => dispatch(closeModal())}>
        <div className="inner-modal-container">
          <CurrentModal {...modalData.modalProps} />
        </div>
      </ClickOutside>
    </div>
  );
};

export default InnerModal;
