export function createCard(
  cardData,
  handleDelete,
  handleLike,
  handleImageClick
) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", handleDelete);
  likeButton.addEventListener("click", handleLike);
  cardImage.addEventListener("click", () => handleImageClick(cardData));

  return cardElement;
}

export function handleDeleteCard(event) {
  const cardElement = event.target.closest(".card");
  cardElement.remove();
}

export function handleLikeCard(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("card__like-button_is-active");
}
