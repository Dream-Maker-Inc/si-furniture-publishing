const menuIconMb = document.getElementById("menu-icon--mb");
const menuIconClose = document.getElementById("menu-icon--close");
const offcanvasNav = document.getElementById("offcanvas-nav");
const contentItems = document.getElementsByClassName("overlay-content__item");

menuIconMb.addEventListener("click", function () {
  offcanvasNav.style.width = "100%";

  for (let i = 0; i < contentItems.length; i++) {
    contentItems[i].style.display = "block";
  }
});

menuIconClose.addEventListener("click", function () {
  offcanvasNav.style.width = "0%";

  for (let i = 0; i < contentItems.length; i++) {
    contentItems[i].style.display = "none";
  }
});
