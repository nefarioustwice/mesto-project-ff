import '../pages/index.css';
import {initialCards} from './cards.js';

import avatar from '../images/avatar.jpg';
import card1 from '../images/card_1.jpg';
import card2 from '../images/card_2.jpg';
import card3 from '../images/card_3.jpg';
import logo from '../images/logo.svg';

const whoIsTheGoat = [
    { name: 'avatar', link: avatar },
    { name: 'card1', link: card1 },
    { name: 'card2', link: card2 },
    { name: 'card3', link: card3 },
    { name: 'logo', link: logo },
]; 

const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');

function createCard(cardData, handleDelete) {
    const cardElement = cardTemplate.content.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', handleDelete);

    return cardElement;
}
function handleDeleteCard(event) {
    const cardElement = event.target.closest('.card');

    cardElement.remove();
}

initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, handleDeleteCard);
    placesList.appendChild(cardElement);
});
