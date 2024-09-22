import '../pages/index.css';

import {
  closeModal,
  openModal,
  handleModalClick,
} from '../components/modal.js';

import { 
  createCard as DOMCreateCard,
  updateLikeButton,
  deleteCardElement,
} from '../components/card.js';

import {
  getInitialCards as APIGetInitialCards,
  getUserInfo as APIGetUserInfo,
  editAvatar as APIEditAvatar,
  editProfileInfo as APIeditProfileInfo,
  likeCard as APILikeCard,
  unlikeCard as APIUnlikeCard,
  addCard as APIAddCard,
  deleteCard as APIDeleteCard,
} from '../components/api.js';

import { clearValidation, enableValidation } from '../components/validation.js';

import { renderLoading } from '../components/utils.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const popupImage = document.querySelector('.popup_type_image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageImage = popupImage.querySelector('.popup__image');

const cardsContainer = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;
const cardForm = document.forms['new-place'];
const cardFormSubmitButton = cardForm.querySelector('.popup__button');
const cardNameInput = cardForm.elements['place-name'];
const cardLinkInput = cardForm.elements.link;

const popupCard = document.querySelector('.popup_type_new-card');
const popupCardButtonOpen = document.querySelector('.profile__add-button');

const profileImageForm = document.forms['edit-avatar'];
const profileImageInput = profileImageForm.elements.avatar;
const profileImageFormSubmitButton =
  profileImageForm.querySelector('.popup__button');

const popupProfileImage = document.querySelector('.popup_type_edit-avatar');

const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = document.forms['edit-profile'];
const profileFormSubmitButton = profileForm.querySelector('.popup__button');
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileButtonOpen = document.querySelector('.profile__edit-button');

const popupConfirm = document.querySelector('.popup_type_confirm');
const popupConfirmButton = popupConfirm.querySelector('.popup__button_confirm');

const setProfile = ({ name, description, avatar }) => {
  profileName.textContent = name;
  profileDescription.textContent = description;
  profileImage.style.backgroundImage = `url(${avatar})`;
};

const handleCardLike = ({ cardId, buttonElement, counterElement }) => {
  buttonElement.disabled = true;

  if (buttonElement.classList.contains('card__like-button_is-active')) {
    APIUnlikeCard(cardId)
      .then(({ likes }) => {
        updateLikeButton({ buttonElement, counterElement, likes });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  } else {
    APILikeCard(cardId)
      .then(({ likes }) => {
        updateLikeButton({ buttonElement, counterElement, likes });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  }
};

const handleCardDelete = ({ cardId, buttonElement, cardElement }) => {
  openModal(popupConfirm);
  popupConfirmButton.onclick = () => {
    APIDeleteCard(cardId)
      .then(() => {
        deleteCardElement({ cardElement, buttonElement });
        closeModal(popupConfirm);
      })
      .catch((error) => console.error(error));
  };
};

const handleCardFormSubmit = (event) => {
  event.preventDefault();
  
  renderLoading({
    buttonElement: cardFormSubmitButton,
    isLoading: true,
  });
  
  APIAddCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  })
    .then((cardData) => {
      cardsContainer.prepend(
        DOMCreateCard({
          currentUserId: cardData.owner['_id'],
          template: cardTemplate,
          data: cardData,
          onDelete: handleCardDelete,
          onLike: handleCardLike,
          onImageClick: handleCardImageClick,
        })
      );
      
      cardForm.reset();
      
      clearValidation(cardForm, validationConfig);
      closeModal(popupCard);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: cardFormSubmitButton,
        isLoading: false,
      });
    });
};

const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  renderLoading({
    buttonElement: profileFormSubmitButton,
    isLoading: true,
  });

  APIeditProfileInfo({
    name: profileNameInput.value,
    description: profileDescriptionInput.value,
  })
    .then(({ name, about, avatar }) => {
      setProfile({
        name,
        description: about,
        avatar,
      });

      closeModal(popupProfile);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: profileFormSubmitButton,
        isLoading: false,
      });
    });
};

const handleProfileImageFormSubmit = (event) => {
  event.preventDefault();

  renderLoading({
    buttonElement: profileImageFormSubmitButton,
    isLoading: true,
  });

  APIEditAvatar(profileImageInput.value)
    .then(({ name, about, avatar }) => {
      setProfile({
        name,
        description: about,
        avatar,
      });

      closeModal(popupProfileImage);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: profileImageFormSubmitButton,
        isLoading: false,
      });
    });
};

const handlePopupProfileButtonOpenClick = () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  clearValidation(profileForm, validationConfig);

  openModal(popupProfile);
};

const handlePopupCardButtonOpenClick = () => {
  cardForm.reset();
  openModal(popupCard);
};

const handleCardImageClick = ({ cardName, cardLink }) => {
  popupImageImage.src = cardLink;
  popupImageImage.alt = cardName;
  popupImageCaption.textContent = cardName;

  openModal(popupImage);
};

const handleProfileImageClick = () => {
  profileImageForm.reset();

  clearValidation(profileImageForm, validationConfig);

  openModal(popupProfileImage);
};


cardForm.addEventListener('submit', handleCardFormSubmit);

profileForm.addEventListener('submit', handleProfileFormSubmit);

profileImageForm.addEventListener('submit', handleProfileImageFormSubmit);

popupImage.addEventListener('click', handleModalClick);

popupProfileImage.addEventListener('click', handleModalClick);

profileImage.addEventListener('click', handleProfileImageClick);

popupCard.addEventListener('click', handleModalClick);
popupCardButtonOpen.addEventListener('click', handlePopupCardButtonOpenClick);

popupProfile.addEventListener('click', handleModalClick);
popupProfileButtonOpen.addEventListener(
  'click',
  handlePopupProfileButtonOpenClick
);

popupConfirm.addEventListener('click', handleModalClick);

enableValidation(validationConfig);

Promise.all([APIGetUserInfo(), APIGetInitialCards()])
  .then(([{ name, about, avatar, ['_id']: currentUserId }, cardsData]) => {
    setProfile({
      name,
      description: about,
      avatar,
    });

    cardsData.forEach((cardData) => {
      const isOwner = cardData.owner['_id'] === currentUserId;
      cardsContainer.append(
        DOMCreateCard({
          currentUserId,
          template: cardTemplate,
          data: cardData,
          onDelete: isOwner ? handleCardDelete : null,
          onLike: handleCardLike,
          onImageClick: handleCardImageClick,
        })
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });