const getCardTemplate = (template) => {
  return template.querySelector('.card').cloneNode(true);
};

const createCard = ({
  currentUserId,
  template,
  data,
  onDelete,
  onLike,
  onImageClick,
}) => {
  const element = getCardTemplate(template);

  const image = element.querySelector('.card__image');
  image.addEventListener('click', () =>
    onImageClick({
      cardName: data.name,
      cardLink: data.link,
    })
  );
  image.src = data.link;
  image.alt = data.name;

  element.querySelector('.card__title').textContent = data.name;

  const counter = element.querySelector('.card__like-counter');

  if (data.likes.length) {
    counter.classList.add('card__like-counter_is-active');
    counter.textContent = data.likes.length;
  }

  const deleteButton = element.querySelector('.card__delete-button');

  if (data.owner['_id'] === currentUserId) {
    deleteButton.classList.remove('hidden');
    deleteButton.addEventListener('click', () => {
      onDelete({
        cardId: data['_id'],
        cardElement: element,
        buttonElement: deleteButton,
      });
    });
  } else {
    deleteButton.classList.add('hidden');
  }

  const likeButton = element.querySelector('.card__like-button');

  if (data.likes.find((element) => element['_id'] === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    onLike({
      cardId: data['_id'],
      buttonElement: likeButton,
      counterElement: counter,
    });
  });

  return element;
};

const updateLikeButton = ({ buttonElement, counterElement, likes }) => {
  if (likes.length) {
    counterElement.classList.add('card__like-counter_is-active');
    counterElement.textContent = likes.length;
  } else {
    counterElement.classList.remove('card__like-counter_is-active');
    counterElement.textContent = '';
  }
  buttonElement.classList.toggle('card__like-button_is-active');
};

const deleteCardElement = ({ cardElement, buttonElement }) => {
  buttonElement.disabled = true;
  cardElement.remove();
  buttonElement.disabled = false;
};

export { createCard, updateLikeButton, deleteCardElement };