export const optionObject = {
  formSelector: '.popup__form', // Класс формы
  inputSelector: '.popup__input', // Класс инпута
  submitButtonSelector: '.popup__button', // Класс кнопки
  inactiveButtonClass: 'popup__button_disabled', // Класс отключающий кнопку
  inputErrorClass: 'popup__input_type_error', // Класс отрабатывающий ошибку
  errorClass: 'popup__error_visible' // Класс показывающий ошибку
};

const optionsApi = {
  baseUrl: 'https://api.world.students.nomoreparties.xyz',
  headers: {
    'Content-Type': 'application/json'
  }
};

export default optionsApi;
