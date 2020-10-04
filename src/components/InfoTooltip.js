import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext} from '../contexts/CurrentUserContext';
import successImagePath from '../images/success.png';
import unSuccessImagePath from '../images/unsuccess.png';

function InfoTooltip({isOpen, onClose, onUpdateUser, isSubmitDataSendState, handleSubmitDataSendState}) {

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
    <PopupWithForm name="infoTooltip" isOpen={isOpen} onClose={onClose}>
      <div className="infoTooltip__container">
        <img className="infoTooltip__image" src={successImagePath}></img>
        <p className="infoTooltip__message">Вы успешно зарегистрировались!</p>
      </div>
      {/* function Header() {
      return (
        <header className="header">
          <img className="header__logo" src={headerPath} alt="Логотип"/>
        </header>
      ); */}



      {/* <input id="name-input-profile" type="text" value={name} onChange={handleChangeName} className="popup__form-name popup__input" name="name" minLength="2" maxLength="40" autoComplete="off" required />
      <span id="name-input-profile-error" className="popup__error" />
      <input id="prof-input" type="text" value={description} onChange={handleChangeDescription} className="popup__form-about popup__input" name="prof" minLength="2" maxLength="200" autoComplete="off" required />
      <span id="prof-input-error" className="popup__error" /> */}
    </PopupWithForm>
  )
}

export default InfoTooltip;
