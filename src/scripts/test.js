
const nameError = document.createElement("div");
const aboutError = document.createElement("div");
nameError.classList.add("error-message");
aboutError.classList.add("error-message");
nameInput.after(nameError);
aboutInput.after(aboutError);

nameError.style.color = "red";
aboutError.style.color = "red";

const namePattern = /^[а-яА-Яa-zA-Z\s-]{2,40}$/;
const aboutPattern = /^[а-яА-Яa-zA-Z\s-]{2,200}$/;

nameInput.addEventListener("input", () => {
  if (nameInput.value === "") {
    nameError.textContent = "Вы пропустили это поле.";
    nameInput.classList.add("invalid");
  } else {
    validateField(nameInput, namePattern, "Минимальное количество символов: 2. Длина текста сейчас: 1 символ.");
  }
});

aboutInput.addEventListener("input", () => {
  if (aboutInput.value === "") {
    aboutError.textContent = "Вы пропустили это поле.";
    aboutInput.classList.add("invalid");
  } else {
    validateField(aboutInput, aboutPattern, "Минимальное количество символов: 2. Длина текста сейчас: 1 символ.");
  }
});

function validateField(input, pattern, errorMessage) {
  if (!pattern.test(input.value)) {
    input.classList.add("invalid");
    input.nextElementSibling.textContent = errorMessage;
    input.style.borderBottom = "1px solid red";
    input.nextElementSibling.style.fontSize = "12px";
  } else {
    input.classList.remove("invalid");
    input.nextElementSibling.textContent = "";
    input.style.borderBottom = "";
    input.nextElementSibling.style.fontSize = "";
  }
  checkFormValidity();
}

function checkFormValidity() {
  const saveButton = editForm.querySelector(".button");
  if (nameInput.classList.contains("invalid") || aboutInput.classList.contains("invalid")) {
    saveButton.disabled = true;
    saveButton.style.background = "transparent";
    saveButton.style.color = "gray";
    saveButton.style.border = "1px solid gray";
  } else {
    saveButton.disabled = false;
    saveButton.style.background = "";
    saveButton.style.color = "";
    saveButton.style.border = "";
  }
}

editButton.addEventListener("click", () => {
  nameError.textContent = "";
  aboutError.textContent = "";
  nameInput.classList.remove("invalid");
  aboutInput.classList.remove("invalid");
  checkFormValidity();
});

/********************************************/
const cardNameInputError = document.createElement("div");
const cardLinkInputError = document.createElement("div");
cardNameInputError.classList.add("error-message");
cardLinkInputError.classList.add("error-message");
cardNameInput.after(cardNameInputError);
cardLinkInput.after(cardLinkInputError);

cardNameInputError.style.color = "red";
cardLinkInputError.style.color = "red";

const cardNamePattern = /^[а-яА-Яa-zA-Z\s-]{2,30}$/;
const cardLinkPattern = /^(https?:\/\/)?([\w\-]+\.){1,}([\w\-~\/\.]*)*$/;

cardNameInput.addEventListener("input", () => {
  if (cardNameInput.value === "") {
    cardNameInputError.textContent = "Вы пропустили это поле.";
    cardNameInput.classList.add("invalid");
  } else {
    validateField(cardNameInput, cardNamePattern, "Название должно быть от 2 до 30 символов.");
  }
});

cardLinkInput.addEventListener("input", () => {
  if (cardLinkInput.value === "") {
    cardLinkInputError.textContent = "Вы пропустили это поле.";
    cardLinkInput.classList.add("invalid");
  } else {
    validateField(cardLinkInput, cardLinkPattern, "Введите адрес сайта.");
  }
});

function checkAddFormValidity() {
  const saveButton = addForm.querySelector(".button");
  if (cardNameInput.classList.contains("invalid") || cardLinkInput.classList.contains("invalid")) {
    saveButton.disabled = true;
    saveButton.style.background = "transparent";
    saveButton.style.color = "gray";
    saveButton.style.border = "1px solid gray";
  } else {
    saveButton.disabled = false;
    saveButton.style.background = "";
    saveButton.style.color = "";
    saveButton.style.border = "";
  }
}

addForm.addEventListener("reset", () => {
  cardNameInputError.textContent = "";
  cardLinkInputError.textContent = "";
  cardNameInput.classList.remove("invalid");
  cardLinkInput.classList.remove("invalid");
  checkAddFormValidity();
});

cardNameInput.addEventListener("input", () => {
  if (cardNameInput.value === "") {
    cardNameInputError.textContent = "Вы пропустили это поле.";
    cardNameInput.classList.add("invalid");
  } else {
    validateField(cardNameInput, cardNamePattern, "Название должно быть от 2 до 30 символов.");
  }
  checkAddFormValidity();
});

cardLinkInput.addEventListener("input", () => {
  if (cardLinkInput.value === "") {
    cardLinkInputError.textContent = "Вы пропустили это поле.";
    cardLinkInput.classList.add("invalid");
  } else {
    validateField(cardLinkInput, cardLinkPattern, "Введите адрес сайта.");
  }
  checkAddFormValidity();
});

addForm.addEventListener("reset", () => {
  checkAddFormValidity();
});