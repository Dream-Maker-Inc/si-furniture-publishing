// footer accordion
const acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("active");
    this.classList.toggle("accordion_icon--active");
  });
}
