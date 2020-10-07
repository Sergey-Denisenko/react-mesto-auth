import React from 'react';

function ImagePopup({card, onClose, closeAllPopups, resetSelectedCardInImagePopup}) {

  // if (onClose === true) {
  //   document.querySelector('.popup-image').classList.remove('popup-image_opened');
  // }

  return (
    <div className={`popup-image popup popup__overlay ${card ? 'popup-image_opened' : ''}`}>
      {card &&  <div className="popup-image__container">
        <button type="button" className="popup-image__close-button popup__close-button" onClick={closeAllPopups && resetSelectedCardInImagePopup}/>
        {/* <button type="button" className="popup-image__close-button popup__close-button" onClick={closeAllPopups}/> */}
        <img className="popup-image__image" src={card.link} alt={card.name} />
        <h3 className="popup-image__title">{card.name}</h3>
      </div> }
    </div>
  );
}

export default ImagePopup;
