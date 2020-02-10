import modalActionTypes from "./modal.types";

export const openModal= (modalType, modalProps) =>({
    type: modalActionTypes.OPEN_MODAL,
    payload: {modalType, modalProps},
});

export const closeModal= () =>({
    type: modalActionTypes.CLOSE_MODAL,
});