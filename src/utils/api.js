import optionsApi from './utils';

class Api {
  constructor(optionsApi) {
    this._optionsApi = optionsApi;
    this._baseUrl = this._optionsApi.baseUrl;
    this._headers = this._optionsApi.headers
  }

  getUserDataDefaultFromServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers:{
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getCardDefaultFromServer() {
    // return fetch(`${this._baseUrl}`, {
      return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      }, method: 'GET',
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  setNewDataUser(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.description
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  addNewCardToServer(userCardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name: userCardData.name,
        link: userCardData.link
      })
    })
      .then((res) => {
        console.log('res in api.js->addNewCardToServer 001');
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteCardFromServer(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  likePlus(id) {
    // return fetch(`${this._baseUrl}/cards/likes/${id}`, {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  likeMinus(id) {
    // return fetch(`${this._baseUrl}/cards/likes/${id}`, {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  avatarUpdate(newAvatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        avatar: newAvatarLink.avatar
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}
const api = new Api(optionsApi);
export default api;
