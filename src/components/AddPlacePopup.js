import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace, isSubmitDataSendState, handleSubmitDataSendState}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(
      {
        name,
        link,
      }
    );
  };

  return(
    <PopupWithForm name="add-card" title="Новое место"  isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isSubmitDataSendState={isSubmitDataSendState} submitButtonText = {isSubmitDataSendState === false ? 'Сохранить' : 'Идет сохранение...'} handleSubmitDataSendState={handleSubmitDataSendState}>
      <input id="name-input-add-card" type="text" value={name} onChange={handleChangeName} className="popup-add-card__form-name popup__input" name="name" placeholder="Название" minLength="1" maxLength="30" autoComplete="off" required/>
      <span id="name-input-add-card-error" className="popup__error" />
      <input id="link-input" type="url" value={link} onChange={handleChangeLink} className="popup-add-card__form-image-link popup__input" name="link" placeholder="Ссылка на картинку" autoComplete="off" required/>
      <span id="link-input-error" className="popup__error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;
