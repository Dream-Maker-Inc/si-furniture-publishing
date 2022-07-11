// footer accordion
const acc = document.getElementsByClassName("acc");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("active");
    this.classList.toggle("acc_icon--active");
  });
}
