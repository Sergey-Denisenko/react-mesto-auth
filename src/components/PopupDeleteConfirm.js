import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupDeleteConfirm({ isOpen, onClose, onCardDelete, isSubmitDataSendState, handleSubmitDataSendState }) {

  return (
    <PopupWithForm name="card-delete" title="Вы уверены?" isOpen={isOpen} onClose={onClose} onSubmit={onCardDelete} isSubmitDataSendState={isSubmitDataSendState} submitDeleteButtonText = {isSubmitDataSendState === false ? 'Да' : 'Идет удаление...'} handleSubmitDataSendState={handleSubmitDataSendState}/>
  )
}

export default PopupDeleteConfirm;
