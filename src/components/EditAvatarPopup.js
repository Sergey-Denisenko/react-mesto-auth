import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isSubmitDataSendState, handleSubmitDataSendState,
message,
}) {

  const avatarRef = React.useRef('');

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,// Значение инпута, полученное с помощью рефа
    });
  }

  return(
    <PopupWithForm name="avatar-update" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isSubmitDataSendState={isSubmitDataSendState} submitButtonText = {isSubmitDataSendState === false ? 'Сохранить' : 'Идет сохранение...'} handleSubmitDataSendState={handleSubmitDataSendState}>
      <input ref={avatarRef} id="link-input_update-avatar" type="url" className="popup-avatar-update__form-image-link popup__input" name="link" placeholder="Ссылка на картинку" defaultValue="" autoComplete="off" required/>
      <span id="link-input_update-avatar-error" className="popup__error" />
      <span id="link-input_update-avatar-error" className="popup__error popup__error_visible">{message}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
