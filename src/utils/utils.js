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
    // 'authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
};

export default optionsApi;

// const optionsApi = {
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
//   // baseUrl: 'https://world.students.nomoreparties.xyz',
//   headers: {
//     authorization: 'b301150e-99e5-48e9-bfa2-35f39eea584a',
//     'Content-Type': 'application/json'
//   }
// };