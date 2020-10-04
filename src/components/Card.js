import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDeleteClick}) {

  const actualUserData = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDeleteClick(card);
  }

  const isOwn = card.owner._id === actualUserData._id;
  const cardDeleteButtonClassName = (`card__trash ${!isOwn ? 'card__trash_disabled' : ''}`);
  const isLiked = card.likes.some(i => i._id === actualUserData._id);
  const cardLikeButtonClassName = (`card__like ${isLiked ? 'card__like_active-black' : ''}`);

  return (
    <div className="card">
      <img className="card__image" alt="" src="" style={{ backgroundImage: `url(${card.link})`}} onClick={handleClick} />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <button type="button" className={`card__like ${cardLikeButtonClassName}`} onClick={handleLikeClick}/>
        <p className="card__like-counter">{card.likes.length}</p>
      </div>
      <button type="button" className={`card__trash ${cardDeleteButtonClassName}`} onClick={handleDeleteClick} />
    </div>
  );
}

export default Card;
