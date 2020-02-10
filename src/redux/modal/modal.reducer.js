import modalActionTypes from "./modal.types";

const INITIAL_STATE = {
  showModal: false,
  modalData: {
    modalType: "",
    modalProps: null
  }
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case modalActionTypes.OPEN_MODAL:
      return {
        ...state,
        showModal: true,
        modalData: action.payload
      };
    case modalActionTypes.CLOSE_MODAL:
      return {
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};

export default modalReducer;
