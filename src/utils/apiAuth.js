// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'https://api.world.students.nomoreparties.xyz';
// export const BASE_URL = 'http://localhost:3000';

export const register = (email, password) => {
  // return fetch(`${BASE_URL}/signup`, {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // mode: 'no-cors',
    // credentials: 'include',
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    console.log('res.body34');
    console.log(res.body);
    console.log('res34');
    console.log(res);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  })
  .then((res) => {
    console.log('res35');
    console.log(res);
    return (res);
  });
}

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // credentials: 'include',
    // mode: 'no-cors',
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  })
  .then((data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);
      return data;
    } else {
      return
    }
  });
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`,
      // authorization: { Authorization: `Bearer ${token}` },
      // 'authorization': `Bearer ${localStorage.getItem('token')}`,
      'authorization': `Bearer ${token}`,
      // authorization: { Authorization: localStorage.token },
      // authorization: { Authorization: token },

      // authorization: 'b301150e-99e5-48e9-bfa2-35f39eea584a'
    }
  })
  .then((res) => { // ВСЁ ПРЕРЫВАЕТСЯ ТУТ !!!
    console.log('token in getContent fetch');
    console.log(token);
    console.log('res getcontent');
    console.log(res);
    console.log('localStorage');
    console.log(localStorage);
    console.log('localStorage.token');
    console.log(localStorage.token);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  })
  .then(res => res)
  .then((data) => {
    if (data.data.email) {
      localStorage.setItem('email', data.data.email);
      return data;
    } else {
      return
    }
  });
}
