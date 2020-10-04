import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext} from '../contexts/CurrentUserContext';

function Login({isOpen, onClose, onUpdateUser, isSubmitDataSendState, handleSubmitDataSendState}) {

//   const currentUser = React.useContext(CurrentUserContext);

//   React.useEffect(() => {
//     setName(currentUser.name);
//     setDescription(currentUser.description);
//   }, [currentUser]);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSetEmail = () => {
    setEmail(!email);
  };

  const handleSetPassword = () => {
    setPassword(!password);
  };

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
        email,
        password,
    });
  }

  return(
    <PopupWithForm name="login" title="Вход" isOpen={true} onClose={onClose} onSubmit={handleSubmit} isSubmitDataSendState={isSubmitDataSendState} submitButtonText = {isSubmitDataSendState === false ? 'Вход...' : 'Войти'} handleSubmitDataSendState={handleSubmitDataSendState}>
      <input id="email-input" type="email" value={email} onChange={handleChangeEmail} className="register__form-email popup__input" name="email" minLength="2" maxLength="40" autoComplete="off" required placeholder="Email" />
      <span id="email-input-error" className="register__error" />
      <input id="password-input" type="password" value={password} onChange={handleChangePassword} className="register__form-password popup__input" name="password" minLength="2" maxLength="200" autoComplete="off" required placeholder="Пароль" />
      <span id="password-input-error" className="register__error" />
    </PopupWithForm>
  )
}

export default Login;
