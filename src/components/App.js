import React from 'react';

// import { useEffect } from 'react';
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
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = React.useState(false); //Переменная состояни
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSubmitDataSendState, setIsSubmitDataSendState] = React.useState(false); // Текст на кнопках / состояние
  const [isRegister, setIsRegister] = React.useState(false); // Состояние зарегистрирован пользователь или нет

  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({ name: '', description: '', avatar: ' ', _id: '' });
  const [message, setMessage] = React.useState(''); // Устанавливаю сообщение об ошибке
  const [tempCardForDelete, setTempCardForDelete] = React.useState(); //Переменная состояния

  const history = useHistory();

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    setClearMessage();// Устанавливаю в message пустую строку (отработка ошибок)
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    setClearMessage();// Устанавливаю в message пустую строку (отработка ошибок)
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    setClearMessage();// Устанавливаю в message пустую строку (отработка ошибок)
  };

// Очистка поля message
const setClearMessage = () => {
  setMessage('');
}

  const closeAllPopups = () => {
    setOnClose(!onClose);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

// Получение данных пользователя и массива карточек с сервера
  React.useEffect(() => {
    tokenCheck();
    Promise.all([
      api.getUserDataDefaultFromServer(),
      api.getCardDefaultFromServer()
    ])
    .then(([userData, cardDefault]) => {
      setCurrentUser({
        ...currentUser,
        name: userData.data.name,
        description: userData.data.about,
        avatar: userData.data.avatar,
        _id: userData.data._id,
      });
      setCards(cardDefault);
    })
    .catch((err) => {
      // console.error(err);
      console.log(err + ' - Зарегистрированных пользователей нет'); // 401
      // console.log(err);
    })
    return () => {
    };
    // eslint-disable-next-line
  }, []);

// Функция обновления данных пользователя
  function handleUpdateUser(userData) {
    api.setNewDataUser(userData)
    .then((userData) => {
      setCurrentUser({
        ...currentUser,
        name: userData.data.name,
        description: userData.data.about,
      });
      closeAllPopups();
    })
    // .catch((err) => {
    //   console.error(err);
    // })
    .catch((err) => {
      if(err === 400) {
        setMessage('Одно из полей заполнено не корректно');// Отработка ошибок в попапе редактирования инфо о пользователе
      } else
      {
        setMessage('Что-то пошло не так!');// Отработка ошибок в попапе редактирования инфо о пользователе
      }
    })
    .finally(() => {
      setIsSubmitDataSendState(false);
    })
    return () => {
    };
  }

// Функция обновления аватара
  function handleUpdateAvatar(newAvatarLink) {
    api.avatarUpdate(newAvatarLink)
    .then((userData) => {
      setCurrentUser({
        ...currentUser,
        avatar: userData.data.avatar,
      });
      closeAllPopups();
    })
    // .catch((err) => {
    //   console.error(err);
    // })
    .catch((err) => {
      if(err === 400) {
        setMessage('Некорректный URL');// Отработка ошибки в попапе редактирования avatar
      } else
      {
        setMessage('Что-то пошло не так!');// Отработка ошибки в попапе редактирования avatar
      }
    })
    .finally(() => {
      setIsSubmitDataSendState(false);
    });

    return () => {
    };
  }

// Функция добавления новой карточки
  function handleAddPlaceSubmit(userCardData) {
    api.addNewCardToServer(userCardData)
    .then((newCard) => {
      setCards(
        [...cards, newCard]
      );
      closeAllPopups();
    })
    // .catch((err) => {
    //   console.error(err);
    // })
    .catch((err) => {
      if(err === 400) {
        setMessage('Одно из полей заполнено не корректно');// Отработка ошибок в попапе редактирования инфо о пользователе
      } else
      {
        setMessage('Что-то пошло не так!');// Отработка ошибок в попапе редактирования инфо о пользователе
      }
    })

    .finally(() => {
      setIsSubmitDataSendState(false);
    })
    return () => {
    }
  }

//Функция проставления лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
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

// Установка состояния нажатия кнопки для отображения на кнопке другого текста
  const handleSubmitDataSendState = () => {
    setIsSubmitDataSendState(!isSubmitDataSendState);
  };

// Установка стейта зарегистрирован пользователь или нет
  const handleIsRegister = () => {
    setIsRegister(!isRegister);
  };


  // Регистрация нового пользователя
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
      } else
      if (err.status === 409) {
        onInfoTooltipOpen();
        setMessage('Пользователь с таким email уже существует');
      } else
      {
        setMessage('Что-то пошло не так!');
      }
    })
    .finally(() => {
      handleSubmitDataSendState();
    });
  };

// Установка стейта в значение true для открытия попапа при регистрации
  const onInfoTooltipOpen = () => {
    setIsInfoTooltipOpen(true);
  };

  // Авторизация пользователя
  const onLogin = (email, password) => {
    setClearMessage();
    apiAuth.login(email, password)
    .then((res) => {
      if (res.token) {
        setEmail(localStorage.getItem('email'));
        tokenCheck();
        api.getCardDefaultFromServer()
        .then((cardDefault) => {
          setCards(cardDefault);
        })
        .catch((err) => {
          console.error(err);
        })
        return () => {
        };
      }
    })
    .catch((err) => {
      if(err.status === 401) {
        setMessage('Пользователь с email не найден');
      } else if (err.status === 400) {
        setMessage('Не передано одно из полей');
      } else {
        setMessage('Что-то пошло не так!');
      }
    })
    .finally(() => {
      handleSubmitDataSendState();
    });
  };

// Выход из аккаунта пользователя
  const onSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    history.push('/sign-in');
    setEmail('');
    setPassword('');
    setLoggedIn(false);
    setIsRegister(false);
    setClearMessage();// Устанавливаю в message пустую строку (отработка ошибок)
    setCurrentUser({
      ...currentUser,
      name: '',
      description: '',
      avatar: '',
      _id: '',
    });
  };

// Проверка токена
  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if(token) {
      apiAuth.getContent(token)
        .then(res => {
          return res;
        })
        .then((userData) => {
        setCurrentUser({
          ...currentUser,
          name: userData.data.name,
          description: userData.data.about,
          avatar: userData.data.avatar,
          _id: userData.data._id,
        })
          setLoggedIn(true);
          history.push('/');
          setEmail(localStorage.getItem('email'));
        })
        .catch((err) => {
          if(err.status === 401) {
            console.log('Переданный токен некорректен');
            console.log(err);
          } else if(err.status === 400) {
            console.log('Токен не передан или передан не в том формате');
            console.log(err);
          } else {
            setLoggedIn(false);
            history.push('/sign-in');
            console.log(err);
          }
        });
    }
  };

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          {loggedIn && email ? <Header emailUser={email} routePathName={ 'Выход' } routePath={ '/sign-in' } loggedIn={loggedIn} onSignOut={onSignOut} /> : ''}

          <Switch>
            <Route path="/sign-up"> {/* регистрация пользователя */}
              <Header routePathName={ 'Войти' } routePath={ '/sign-in' } setClearMessage={setClearMessage} />
              <Register
                isSubmitDataSendState={isSubmitDataSendState}
                handleSubmitDataSendState={handleSubmitDataSendState}
                onRegister={onRegister}
                onInfoTooltipOpen={onInfoTooltipOpen}
                message={message}
                setClearMessage={setClearMessage}
              />
            </Route>

            <Route path="/sign-in"> {/* авторизация пользователя - вход */}
              <Header routePathName={ 'Регистрация' } routePath={ '/sign-up' } setClearMessage={setClearMessage} />
              <Login
                isSubmitDataSendState={isSubmitDataSendState}
                handleSubmitDataSendState={handleSubmitDataSendState}
                onLogin={onLogin}
                message={message}
                setClearMessage={setClearMessage}
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
          message={message}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isSubmitDataSendState={isSubmitDataSendState}
          handleSubmitDataSendState={handleSubmitDataSendState}
          message={message}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isSubmitDataSendState={isSubmitDataSendState}
          handleSubmitDataSendState={handleSubmitDataSendState}
          message={message}
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
