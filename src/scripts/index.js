import "../pages/index.css";
import { initialCards } from "./cards.js";

import avatar from "../images/avatar.jpg";
import card1 from "../images/card_1.jpg";
import card2 from "../images/card_2.jpg";
import card3 from "../images/card_3.jpg";
import logo from "../images/logo.svg";

const whoIsTheGoat = [
  { name: "avatar", link: avatar },
  { name: "card1", link: card1 },
  { name: "card2", link: card2 },
  { name: "card3", link: card3 },
  { name: "logo", link: logo },
];

const cardTemplate = document.querySelector("#card-template");
const placesList = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const closeButtons = document.querySelectorAll(".popup__close");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const cardImages = document.querySelectorAll(".card__image");

const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");
const editForm = document.querySelector(".popup_type_edit");
const nameInput = editForm.querySelector(".popup__input_type_name");
const aboutInput = editForm.querySelector(".popup__input_type_description");
const saveButton = editForm.querySelector(".popup__button");

const addForm = document.querySelector(".popup_type_new-card form");
const cardNameInput = addForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addForm.querySelector(".popup__input_type_url");

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", closePopupByOverlay);
  document.addEventListener("keydown", closePopupByEsc);
}
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closePopupByOverlay);
  document.removeEventListener("keydown", closePopupByEsc);
}
function closePopupByOverlay(event) {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
}
function closePopupByEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

popupEdit.addEventListener("click", closePopupByOverlay);
popupAdd.addEventListener("click", closePopupByOverlay);
popupImage.addEventListener("click", closePopupByOverlay);

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(popupEdit);
});
addButton.addEventListener("click", () => {
  openPopup(popupAdd);
});
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closePopup(button.closest(".popup"));
  });
});
saveButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newName = nameInput.value;
  const newAbout = aboutInput.value;
  profileName.textContent = newName;
  profileAbout.textContent = newAbout;
  closePopup(popupEdit);
});
cardImages.forEach((image) => {
  image.addEventListener("click", () => {
    openPopup(popupImage);
  });
});

function createCard(cardData, handleDelete, handleLike) {
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
  cardImage.addEventListener("click", handleImageClick);

  return cardElement;
}
function handleImageClick(event) {
  const imageSrc = event.target.src;
  const popupImage = document.querySelector(".popup_type_image");
  const imageElement = popupImage.querySelector(".popup__image");
  const caption = document.querySelector(".popup__caption");
  caption.innerText = event.target.alt;
  imageElement.src = imageSrc;
  openPopup(popupImage);
}

function handleDeleteCard(event) {
  const cardElement = event.target.closest(".card");
  cardElement.remove();
}

function handleLikeCard(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("card__like-button_is-active");
}

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  const newCardData = { name: cardName, link: cardLink };
  const newCardElement = createCard(
    newCardData,
    handleDeleteCard,
    handleLikeCard,
    handleImageClick
  );
  placesList.prepend(newCardElement);
  closePopup(popupAdd);
  cardNameInput.value = "";
  cardLinkInput.value = "";
});

initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData,
    handleDeleteCard,
    handleLikeCard,
    handleImageClick
  );
  placesList.appendChild(cardElement);
});
