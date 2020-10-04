import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext} from '../contexts/CurrentUserContext';
import * as apiAuth from '../utils/apiAuth';
import { Link, withRouter, useHistory } from 'react-router-dom';

function Register({isOpen, onClose, onUpdateUser, isSubmitDataSendState, handleSubmitDataSendState}) {

//   const currentUser = React.useContext(CurrentUserContext);

//   React.useEffect(() => {
//     setName(currentUser.name);
//     setDescription(currentUser.description);
//   }, [currentUser]);


// export const BASE_URL = 'https://api.nomoreparties.co';
// export const register

  // handleSubmit(evt){
  //   evt.preventDefault()
  // if (this.state.password === this.state.confirmPassword){
  //   const { email, password } = this.state;
  //   apiAuth.register(email, password);
  // }
  // }

const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

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

  // function handleSubmit(evt) {
  //   evt.preventDefault();
  //   onUpdateUser({
  //       email,
  //       password,
  //   });
  // }

  const handleSubmit = (evt) => {
    evt.preventDefault()
  // if (this.state.password === this.state.confirmPassword){
    // const { email, password } = this.state;

    apiAuth.register(email, password)
    .then((res) => {

      if(res) {
        setMessage('all ok');

        history.push('/sign-in')

      } else {
        setMessage('Что-то пошло не так!')
      }
    })
  }
  // }



  return(
    <PopupWithForm name="register" title="Регистрация" isOpen={true} onClose={onClose} onSubmit={handleSubmit} isSubmitDataSendState={isSubmitDataSendState} submitButtonText = {isSubmitDataSendState === false ? 'Регистрация...' : 'Зарегистрироваться'} handleSubmitDataSendState={handleSubmitDataSendState}>
      <input id="email-input" type="email" value={email} onChange={handleChangeEmail} className="register__form-email popup__input" name="email" minLength="2" maxLength="40" autoComplete="off" required placeholder="Email" />
      <span id="email-input-error" className="register__error" />
      <input id="password-input" type="password" value={password} onChange={handleChangePassword} className="register__form-password popup__input" name="password" minLength="2" maxLength="200" autoComplete="off" required placeholder="Пароль" />
      <span id="password-input-error" className="register__error" />
      <span id="message-error" className="register__auth-error-message" >{message}</span>
    </PopupWithForm>
  )
}

// export default Register;
export default withRouter(Register);