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