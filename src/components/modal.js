export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", closePopupByOverlay);
  document.addEventListener("keydown", closePopupByEsc);
}
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closePopupByOverlay);
  document.removeEventListener("keydown", closePopupByEsc);
}
export function closePopupByOverlay(event) {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
}
export function closePopupByEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
