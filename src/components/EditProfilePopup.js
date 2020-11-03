import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isSubmitDataSendState, handleSubmitDataSendState,
message,
}) {

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.description);
  }, [currentUser]);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      description,
    });
  }

  return(
    <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isSubmitDataSendState={isSubmitDataSendState} submitButtonText = {isSubmitDataSendState === false ? 'Сохранить' : 'Идет сохранение...'} handleSubmitDataSendState={handleSubmitDataSendState}>
      <input id="name-input-profile" type="text" value={name} onChange={handleChangeName} className="popup__form-name popup__input" name="name" minLength="2" maxLength="40" autoComplete="off" required />
      <span id="name-input-profile-error" className="popup__error" />
      <input id="prof-input" type="text" value={description} onChange={handleChangeDescription} className="popup__form-about popup__input" name="prof" minLength="2" maxLength="200" autoComplete="off" required />
      <span id="prof-input-error" className="popup__error" />
      <span id="name-input-profile-error" className="popup__error popup__error_visible">{message}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
