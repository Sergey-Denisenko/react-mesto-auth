import React from 'react';
import Card from './Card';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onClose, closeAllPopups, cards, onCardLike, setOnClose, onCardDeleteClick}) {

  const actualUserData = React.useContext(CurrentUserContext); //Подписка на контекст
  console.log('actualUserData in Main.js');
  console.log(actualUserData);
  console.log('actualUserData.name in Main.js');
  console.log(actualUserData.name);

  const [selectedCard, setSelectedCard] = React.useState(); //Переменная состояния
  const [isOpen, setIsOpen] = React.useState(false); //Переменная состояния
console.log('cards in Main.js');
console.log(cards);
// console.log('cards._id in Main.js');
// console.log(cards._id);
// console.log('cards.data in Main.js');
// console.log(cards.data);
// console.log('cards.data._id in Main.js');
// console.log(cards.data._id);
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsOpen(!isOpen);
    setOnClose(false);
  }
  const resetSelectedCardInImagePopup = () => {
    setSelectedCard();
  }

  return (
    <>
      <main className="content">
        <section className="profile">
          <button onClick={onEditAvatar} type="button" className="profile__avatar-button" style={{ backgroundImage: `url(${actualUserData.avatar}`, minWidth: '120px'}} />
          <div className="profile__data">
            <div className="profile__info">
              <h1 className="profile__title-name">{actualUserData.name}</h1>
              <p className="profile__subtitle-about">{actualUserData.description}</p>
            </div>
            <button onClick={onEditProfile} type="button" className="profile__edit-button" />
          </div>
          <button onClick={onAddPlace} type="button" className="profile__add-button" />
        </section>

        <section className="card-container">
          {/* {cards.data.map((card) => ( */}
          {cards.map((card) => (
            <div key={card._id}>
              <Card card={card} onCardClick={handleCardClick} onCardLike={onCardLike}  onCardDeleteClick={onCardDeleteClick} />
            </div>
          ))}
        </section>
      </main>
      <ImagePopup card={selectedCard} onClose={onClose} closeAllPopups={closeAllPopups} resetSelectedCardInImagePopup={resetSelectedCardInImagePopup}/>
    </>
  );
}

export default Main;
