import React from 'react';
import PopupWithForm from './PopupWithForm';
import { withRouter } from 'react-router-dom';

function Register({
  isSubmitDataSendState,
  handleSubmitDataSendState,
  onRegister,
  message,
}) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegister(email, password);
  }

  return(
    <PopupWithForm name="register" title="Регистрация" isOpen={true} onSubmit={handleSubmit} isSubmitDataSendState={isSubmitDataSendState} submitButtonText = {isSubmitDataSendState === false ? 'Зарегистрироваться' : 'Идет регистрация...'} handleSubmitDataSendState={handleSubmitDataSendState}>
      <input id="email-input" type="email" value={email} onChange={handleChangeEmail} className="register__form-email popup__input" name="email" minLength="2" maxLength="40" autoComplete="off" required placeholder="Email" />
      <span id="email-input-error" className="register__error" />
      <input id="password-input" type="password" value={password} onChange={handleChangePassword} className="register__form-password popup__input" name="password" minLength="2" maxLength="200" autoComplete="off" required placeholder="Пароль" />
      <span id="password-input-error" className="register__error" />
      <span id="message-error" className="register__auth-error-message" >{message}</span>
    </PopupWithForm>
  );
}

export default withRouter(Register);