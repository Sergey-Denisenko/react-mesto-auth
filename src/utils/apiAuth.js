// import optionsApi from './utils';

// class Api {
//   constructor(optionsApi) {
//     this._optionsApi = optionsApi;
//     this._baseUrl = this._optionsApi.baseUrl;
//     this._headers = this._optionsApi.headers
//   }

//   setNewUser(email, password) {
//     return fetch(`${this._baseUrl}/sign-up`, {
//       method: 'POST',
//       headers: this._headers,
//       body: JSON.stringify({ email, password })
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         return Promise.reject(`Ошибка: ${res.status}`);
//       })
//   }



  export const BASE_URL = 'https://auth.nomoreparties.co';

  export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then((response) => {
      console.log('01');
      console.log('response21');
      console.log(response);
      try {
        if (response.status === 200){
          console.log('02');
          return response.json();
        }
      } catch(evt){
        console.log('03');
        return (evt)
      }
    })
    .then((res) => {
      console.log('04');
      console.log('res211');
      console.log(res);

      return res;
    })
    .catch((err) => console.log(err + ' 05'));
  };






























//   getUserDataDefaultFromServer() {
//     return fetch(`${this._baseUrl}/sign-up`, {
//       headers: this._headers
//       }
//     )
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         return Promise.reject(`Ошибка: ${res.status}`);
//       })
//   }

//   getCardDefaultFromServer() {
//     return fetch(`${this._baseUrl}/cards`, {
//       headers: this._headers
//       }
//     )
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         return Promise.reject(`Ошибка: ${res.status}`);
//       })
//   }

//   setNewDataUser(userData) {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify({
//         name: userData.name,
//         about: userData.description
//       })
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         return Promise.reject(`Ошибка: ${res.status}`);
//       })
//   }

//   addNewCardToServer(userCardData) {
//     return fetch(`${this._baseUrl}/cards`, {
//       method: 'POST',
//       headers: this._headers,
//       body: JSON.stringify({
//         name: userCardData.name,
//         link: userCardData.link
//       })
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         return Promise.reject(`Ошибка: ${res.status}`);
//       })
//   }

//   deleteCardFromServer(id) {
//     return fetch(`${this._baseUrl}/cards/${id}`, {
//       method: 'DELETE',
//       headers: this._headers
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         return Promise.reject(`Ошибка: ${res.status}`);
//       })
//   }

//   likePlus(id) {
//     return fetch(`${this._baseUrl}/cards/likes/${id}`, {
//       method: 'PUT',
//       headers: this._headers
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         return Promise.reject(`Ошибка: ${res.status}`);
//       })
//   }

//   likeMinus(id) {
//     return fetch(`${this._baseUrl}/cards/likes/${id}`, {
//       method: 'DELETE',
//       headers: this._headers
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         return Promise.reject(`Ошибка: ${res.status}`);
//       })
//   }

//   avatarUpdate(newAvatarLink) {
//     return fetch(`${this._baseUrl}/users/me/avatar`, {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify({
//         avatar: newAvatarLink.avatar
//       })
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         return Promise.reject(`Ошибка: ${res.status}`);
//       })
//   }
// }
// const api = new Api(optionsApi);
// export default api;
