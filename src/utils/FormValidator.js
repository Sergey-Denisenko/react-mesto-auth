export class FormValidator {
  constructor(optionObject, formElement) { //Принимает объект настроек и элемент формы
    this._optionObject = optionObject;
    this._formElement = formElement;
    this._inputSelector = this._optionObject.inputSelector; // Класс инпута
    this._submitButtonSelector = this._optionObject.submitButtonSelector; // Класс кнопки
    this._inactiveButtonClass = this._optionObject.inactiveButtonClass; // Класс отключающий кнопку
    this._inputErrorClass = this._optionObject.inputErrorClass; // Класс отрабатывающий ошибку
    this._errorClass = this._optionObject.errorClass;// Класс показывающий ошибку
    this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector); //Поиск кнопки в форме
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));//Список полей ввода
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(function(inputElement) {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
      this._submitButtonElement.disabled = true;
    } else {
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
      this._submitButtonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(this._formElement, inputElement);
        this.toggleButtonState(this._inputList, this._submitButtonElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  hideError() {
    this._formElement.querySelectorAll('.popup__error').forEach(deleteErrorText => {
      deleteErrorText.classList.remove(this._errorClass);
    });
    this._formElement.querySelectorAll('.popup__input').forEach(deleteErrorText => {
      deleteErrorText.classList.remove(this._inputErrorClass);
    });
  }
}
