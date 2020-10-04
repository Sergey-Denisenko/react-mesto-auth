import React from 'react';

function PopupWithForm({name, title, isOpen, onClose, onSubmit, submitButtonText = '', submitDeleteButtonText = '', handleSubmitDataSendState, children}) {

  if (onClose === true) {
    document.querySelector(`.popup`).classList.remove('popup_opened');
  }

  return (

    // isOpen && (name === "infoTooltip") ? (

    //     <form id="form-popup" className="popup__container popup__form" noValidate name={name} onSubmit={onSubmit}>
    //       {/* <fieldset className="popup__form-profile popup__fieldset"> */}

    //         {children}

    //       {/* </fieldset> */}
    //       <button onClick={onClose} type="button" className="popup__form-close-button popup__close-button" />
    //     </form>

    // ) : (
    //     <form id="form-popup" className="popup__container popup__form" noValidate name={name} onSubmit={onSubmit}>
    //     {/* <fieldset className="popup__form-profile popup__fieldset"> */}
    //       {children}
    //     {/* </fieldset> */}
    //     <button onClick={onClose} type="button" className="popup__form-close-button popup__close-button" />
    //   </form>

    // )
    // )

    isOpen && (name === "login" || "register") ? (

      isOpen && (name === "register") ? (
    // <div className={`popup popup_type_${name} popup__overlay ${isOpen ? 'popup_opened' : ''}`}>
      <form id="form-popup" className="register__container popup__form" noValidate name={name} onSubmit={onSubmit}>
        <h2 className="register__form-title">{title}</h2>
        <fieldset className="register__form-profile popup__fieldset">
          {children}
          <button type="submit" className="register__form-submit register__button" onClick={handleSubmitDataSendState}>{submitButtonText}</button>
          <div className="register__form-login-link">
            <a className="register__login-link" href="/sign-in">Уже зaрегистрированы? Войти</a>
          </div>
        </fieldset>
      </form>
    // </div>
      ) : (
          // <div className={`popup popup_type_${name} popup__overlay ${isOpen ? 'popup_opened' : ''}`}>
          <form id="form-popup" className="register__container popup__form" noValidate name={name} onSubmit={onSubmit}>
          <h2 className="register__form-title">{title}</h2>
          <fieldset className="register__form-profile popup__fieldset">
            {children}
            <button type="submit" className="register__form-submit register__button" onClick={handleSubmitDataSendState}>{submitButtonText}</button>
            <div className="register__form-login-link">
              <a className="register__login-link" href="/sign-up">Еще не зарегистрированы? Регистрация</a>
            </div>
          </fieldset>
        </form>
      // </div>
      )

    ) : (

    <div className={`popup popup_type_${name} popup__overlay ${isOpen ? 'popup_opened' : ''}`}>
      <form id="form-popup" className="popup__container popup__form" noValidate name={name} onSubmit={onSubmit}>
        <h2 className="popup__form-title">{title}</h2>
        <fieldset className="popup__form-profile popup__fieldset">
          {children}
          {isOpen && (name === "card-delete") ? (
            <button type="submit" className="popup-card-delete__form-submit popup__button" onClick={handleSubmitDataSendState}>{submitDeleteButtonText}</button>
          ) : (
            <button type="submit" className="popup__form-submit popup__button" onClick={handleSubmitDataSendState}>{submitButtonText}</button>
          )}
        </fieldset>
        <button onClick={onClose} type="button" className="popup__form-close-button popup__close-button" />
      </form>
    </div>
    )
  );
}

export default PopupWithForm;
