export const BASE_URL = 'https://api.nomoreparties.co';

function resStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(resStatus)
}

export const getAllMovies = () => {
  return request(`${BASE_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}