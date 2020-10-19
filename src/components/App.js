import React from 'react';

import { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, withRouter } from 'react-router-dom';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupDeleteConfirm from './PopupDeleteConfirm';
//import FomrValidation from '../utils/FormValidator';
import * as apiAuth from '../utils/apiAuth';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  // eslint-disable-next-line
  const [password, setPassword] = React.useState('');
  const [onClose, setOnClose] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = React.useState(false); //Переменная состояния
  // const handleCardDeletePopupOpen = () => {
  //   setIsCardDeletePopupOpen(!isCardDeletePopupOpen);
  // };
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const closeAllPopups = () => {
    setOnClose(!onClose);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  function handleUpdateUser(userData) {
    api.setNewDataUser(userData)
    .then((userData) => {
      setCurrentUser({
        ...currentUser,
        name: userData.name,
        description: userData.about,
      });
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setIsSubmitDataSendState(false);
    })
    return () => {
    };
  }

  function handleUpdateAvatar(newAvatarLink) {
    api.avatarUpdate(newAvatarLink)
    .then((userData) => {
      setCurrentUser({
        ...currentUser,
        avatar: userData.avatar,
      });
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setIsSubmitDataSendState(false);
    });

    return () => {
    };
  }

// Получение данных пользователя и массива карточек с сервера
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({ name: '', description: '', avatar: ' ', _id: '' });

  React.useEffect(() => {
    Promise.all([
      api.getUserDataDefaultFromServer(),
      api.getCardDefaultFromServer()
    ])
    .then(([userData, cardDefault]) => {
      setCards(cardDefault);
      setCurrentUser({
        ...currentUser,
        name: userData.name,
        description: userData.about,
        avatar: userData.avatar,
        _id: userData._id,
      });
    })
    .catch((err) => {
      console.error(err);
    })
    return () => {
    };
    // eslint-disable-next-line
  }, []);

  function handleAddPlaceSubmit(userCardData) {
    api.addNewCardToServer(userCardData)
    .then((newCard) => {
      setCards(
        [...cards, newCard]
      );
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setIsSubmitDataSendState(false);
    })
    return () => {
    }
  }

//Функция проставления лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.likePlus(card._id)
      .then((newCard) => {
        const newCards = cards.map((item) => item._id === card._id ? newCard : item);
        setCards(newCards);
      });
    }
    if (isLiked) {
      api.likeMinus(card._id)
      .then((newCard) => {
        const newCards = cards.map((item) => item._id === card._id ? newCard : item);
        setCards(newCards);
      });
    }
  }

  const [tempCardForDelete, setTempCardForDelete] = React.useState(); //Переменная состояния

  const handleCardDeleteClick = (card) => {
    setIsCardDeletePopupOpen(!isCardDeletePopupOpen);
    setTempCardForDelete(card);
  };

  function handleCardDeleteSubmit(evt) {
    evt.preventDefault();
    api.deleteCardFromServer(tempCardForDelete._id)
    .then(() => {
      const newCards = cards.filter((item) => item._id !== tempCardForDelete._id ? true : false);
      setCards(newCards);
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setIsSubmitDataSendState(false);
    })
    return () => {
    }
  }

// Тескт на кнопках при загрухке данных
  const [isSubmitDataSendState, setIsSubmitDataSendState] = React.useState(false);

  const handleSubmitDataSendState = () => {
    setIsSubmitDataSendState(!isSubmitDataSendState);
  };

// Добавление нового функционала

  const [isRegister, setIsRegister] = React.useState(false);

  const handleIsRegister = () => {
    setIsRegister(!isRegister);
  };

  const setClearMessage = () => {
    setMessage('');
  }

  const [message, setMessage] = React.useState('');
  const onRegister = (email, password) => {
    setClearMessage();
    apiAuth.register(email, password)
    .then(res => res)
    .then((data) => {
      if(data) {
        handleIsRegister();
        onInfoTooltipOpen();
        history.push('/sign-in');
      }
    })
    .catch((err) => {
      if(err.status === 400) {
        onInfoTooltipOpen();
        setMessage('Некорректно заполнено одно из полей ');
      } else {
        setMessage('Что-то пошло не так!');
        console.log(err);
      }
    })
    .finally(() => {
      handleSubmitDataSendState();
    });
  };

  const onInfoTooltipOpen = () => {
    setIsInfoTooltipOpen(true);
  };

  const onLogin = (email, password) => {
    setClearMessage();
    apiAuth.login(email, password)
    .then((res) => {
      if (res.token) {
        setEmail(localStorage.getItem('email'));
        setLoggedIn(true);
        tokenCheck();
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
  };

  const onSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    history.push('/sign-in');
    setEmail('');
    setPassword('');
    setLoggedIn(false);
    setIsRegister(false);
  };

  const history = useHistory();

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if(token) {
      apiAuth.getContent(token)
        .then(res => res)
        .then((res) => {
          setLoggedIn(true);
          history.push('/');
          setEmail(localStorage.getItem('email'));
        })
        .catch((err) => {
          if(err.status === 401) {
            console.log('Переданный токен некорректен');
          } else if(err.status === 400) {
            console.log('Токен не передан или передан не в том формате');
          } else {
            setLoggedIn(false);
            history.push('/sign-in');
            console.log(err);
          }
        });
    }
  };

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          {loggedIn && email ? <Header emailUser={email} routePathName={ 'Выход' } routePath={ '/sign-in' } loggedIn={loggedIn} onSignOut={onSignOut} /> : ''}

          <Switch>
            <Route path="/sign-up"> {/* регистрация пользователя */}
              <Header routePathName={ 'Войти' } routePath={ '/sign-in' } />
              <Register
                isSubmitDataSendState={isSubmitDataSendState}
                handleSubmitDataSendState={handleSubmitDataSendState}
                onRegister={onRegister}
                onInfoTooltipOpen={onInfoTooltipOpen}
                message={message}
              />
            </Route>

            <Route path="/sign-in"> {/* авторизация пользователя - вход */}
              <Header routePathName={ 'Регистрация' } routePath={ '/sign-up' } />
              <Login
                isSubmitDataSendState={isSubmitDataSendState}
                handleSubmitDataSendState={handleSubmitDataSendState}
                onLogin={onLogin}
                message={message}
              />
            </Route>

            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onClose={onClose}
              closeAllPopups={closeAllPopups}
              cards={cards}
              onCardLike={handleCardLike}
              setOnClose={setOnClose}
              onCardDeleteClick={handleCardDeleteClick}
            />
          </Switch>

          <Route>
            {loggedIn === false ? <Redirect to='/sign-in' /> : <Redirect to='/' />}
          </Route>

          <Route path="*">
            <Redirect to='/sign-in' />
          </Route>
        </div>
        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={onClose}
          closeAllPopups={closeAllPopups}
          isRegister={isRegister}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isSubmitDataSendState={isSubmitDataSendState}
          handleSubmitDataSendState={handleSubmitDataSendState}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isSubmitDataSendState={isSubmitDataSendState}
          handleSubmitDataSendState={handleSubmitDataSendState}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isSubmitDataSendState={isSubmitDataSendState}
          handleSubmitDataSendState={handleSubmitDataSendState}
        />

        <PopupDeleteConfirm
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDeleteSubmit}
          isSubmitDataSendState={isSubmitDataSendState}
          handleSubmitDataSendState={handleSubmitDataSendState}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App);
