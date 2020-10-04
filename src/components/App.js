import React from 'react';

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

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

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false)

  const [onClose, setOnClose] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = React.useState(false); //Переменная состояния
  // const handleCardDeletePopupOpen = () => {
  //   setIsCardDeletePopupOpen(!isCardDeletePopupOpen);
  // };

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
  }

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
  };

// Тескт на кнопках при загрухке данных
  const [isSubmitDataSendState, setIsSubmitDataSendState] = React.useState(false);

  const handleSubmitDataSendState = () => {
    setIsSubmitDataSendState(!isSubmitDataSendState);
  };

const q = () => {
  setLoggedIn(!loggedIn);
}

  return (
    // <BrowserRouter>


    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          {/* <Header /> */}

          <Switch>
            {/* <Route path="/infoTooltip">
              <InfoTooltip />
            </Route> */}
            <Route path="/sign-up"> {/* регистрация пользователя */}
              <Header routePathName={ 'Войти' } routePath={ '/sign-in' } />
              <Register />
            </Route>

            <Route path="/sign-in"> {/* авторизация пользователя - вход */}
              <Header routePathName={ 'Регистрация' } routePath={ '/sign-up' } />
              <Login />
            </Route>
            <ProtectedRoute path="/cards" loggedIn={loggedIn}>
            {/* <Route path="/cards"> */}
              <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onClose={onClose} closeAllPopups={closeAllPopups}
              cards={cards} onCardLike={handleCardLike} setOnClose={setOnClose} onCardDeleteClick={handleCardDeleteClick} />

              {/* <Footer /> */}

              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isSubmitDataSendState={isSubmitDataSendState} handleSubmitDataSendState={handleSubmitDataSendState}/>

              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isSubmitDataSendState={isSubmitDataSendState} handleSubmitDataSendState={handleSubmitDataSendState}/>

              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isSubmitDataSendState={isSubmitDataSendState} handleSubmitDataSendState={handleSubmitDataSendState}/>

              <PopupDeleteConfirm isOpen={isCardDeletePopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDeleteSubmit} isSubmitDataSendState={isSubmitDataSendState} handleSubmitDataSendState={handleSubmitDataSendState}/>
            {/* </Route> */}
            </ProtectedRoute>


            <Route>
              {loggedIn ? <Redirect to='cards' /> : <Redirect to='sign-in' />}
            </Route>
            {/* {<Redirect to={`/${loggedIn === true ? 'cards' : 'login'}`} />} */}

          </Switch>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </div>


    // </BrowserRouter>
  );
}

export default App;
