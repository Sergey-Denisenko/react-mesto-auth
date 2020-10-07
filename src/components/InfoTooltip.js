import React from 'react';
import successImagePath from '../images/success.png';
import unSuccessImagePath from '../images/unsuccess.png';

function InfoTooltip({isOpen, closeAllPopups, isRegister}) {

  return(
    isRegister === true && isOpen ? (
      <div className={`infotooltip infotooltip__overlay ${isOpen ? 'infotooltip_opened' : ''}`}>
        <form id="form-popup" className="infotooltip__container">
          <img className="infotooltip__image" src={successImagePath} alt="Успешная регистрация"/>
          <p className="infotooltip__message">Вы успешно зарегистрировались!</p>
          <button onClick={closeAllPopups} type="button" className="popup__form-close-button popup__close-button" />
        </form>
      </div>
      ) :  isRegister === false && isOpen ? (
      <div className={`infotooltip infotooltip__overlay ${isOpen ? 'infotooltip_opened' : ''}`}>
        <form id="form-popup" className="infotooltip__container">
            <img className="infotooltip__image" src={unSuccessImagePath}  alt="Регистрация не пройдена"/>
            <p className="infotooltip__message">Что-то пошло не так! Попробуйте ещё раз.</p>
          <button onClick={closeAllPopups} type="button" className="popup__form-close-button popup__close-button" />
        </form>
      </div>
    ) : ''
  );
}

export default InfoTooltip;
