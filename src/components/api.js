const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-23",
  headers: {
    authorization: "93f69e6a-fb23-405c-a2f3-00b7aabd45ce",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const checkImageUrl = (url) => {
  return fetch(url, {
    method: 'HEAD',
  }).then(({ ok, headers, status }) => {
    if (ok) {
      if (headers.get('Content-Type').includes('image')) {
        return Promise.resolve();
      }
      return Promise.reject('Ошибка: URL ссылается на не изображение');
    }
    return Promise.reject(`Ошибка: ${status}`);
  });
};

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { 
    headers: config.headers,
  }).then(handleResponse);
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

const editProfileInfo = ({ name, description }) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name,
      about: description,
    }),
  }).then(handleResponse);
};

const addCard = ({ name, link }) => {
  return checkImageUrl(link).then(() =>
    fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(handleResponse)
  );
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  }).then(handleResponse);
};

const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'PUT',
  }).then(handleResponse);
};

const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  }).then(handleResponse);
};

const editAvatar = (url) => {
  return checkImageUrl(url).then(() =>
    fetch(`${config.baseUrl}/users/me/avatar`, {
      headers: config.headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(handleResponse)
  );
};

export {
    getUserInfo,
    getInitialCards,
    editProfileInfo,
    addCard,
    deleteCard,
    likeCard,
    unlikeCard,
    editAvatar,
};