import React from 'react';
import PopupWithForm from './PopupWithForm';
import * as apiAuth from '../utils/apiAuth';
import { withRouter } from 'react-router-dom';

function Login({isSubmitDataSendState, handleSubmitDataSendState, onLogin}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setMessage('');
    apiAuth.login(email, password)
    .then((res) => {
      if (res.token) {
        setEmail(localStorage.getItem('email'));
        onLogin();
      }
    })
    .catch((err) => {
      if(err.status === 401) {
        setMessage('Пользователь с email не найден');
      } else if (err.status === 400) {
        setMessage('Не передано одно из полей');
      } else {
        setMessage('Что-то пошло не так!');
        console.log(err);
      }
    })
    .finally(() => {
      handleSubmitDataSendState();
    });
  }

  return(
    <PopupWithForm name="login" title="Вход" isOpen={true} onSubmit={handleSubmit} isSubmitDataSendState={isSubmitDataSendState} submitButtonText = {isSubmitDataSendState === false ? 'Войти' : 'Выполняется вход...'} handleSubmitDataSendState={handleSubmitDataSendState}>
      <input id="email-input" type="email" value={email} onChange={handleChangeEmail} className="register__form-email popup__input" name="email" minLength="2" maxLength="40" autoComplete="off" required placeholder="Email" />
      <span id="email-input-error" className="register__error" />
      <input id="password-input" type="password" value={password} onChange={handleChangePassword} className="register__form-password popup__input" name="password" minLength="2" maxLength="200" autoComplete="off" required placeholder="Пароль" />
      <span id="password-input-error" className="register__error" />
      <span id="message-error" className="register__auth-error-message" >{message}</span>
    </PopupWithForm>
  );
}

export default withRouter(Login);
