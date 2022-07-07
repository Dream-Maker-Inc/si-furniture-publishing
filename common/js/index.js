// direction에 따라 popup 위치 설정
const getPositionByDirection = (direction, element) => {
  switch (direction) {
    case "top":
      element.style.top = "-6rem";
      element.style.right = "-3rem";
      break;
    case "bottom":
      element.style.top = "2rem";
      element.style.right = "-3.2rem";
      break;
    case "right":
      element.style.top = "-2rem";
      element.style.right = "-7.6rem";
      break;
    case "left":
      element.style.top = "-2.5rem";
      element.style.right = "2rem";
      break;
    default:
      element.style.top = "0.5rem";
  }
};

// 새 창 혹은 현재 창으로 연결 설정
const setPopupByLink = (element, popupState, address) => {
  element.href = address;

  if (popupState == true) {
    element.target = "_blank";
  }
};

// aria-hiddeen 설정
const setAriaHidden = (element, roundPositionElement, hiddenState) => {
  if (hiddenState == true) {
    element.dataset.hidden = "true";
    element.className = "popup__default popup__wrapper";
    roundPositionElement.className = "round-position__default round-position";
  } else {
    element.dataset.hidden = "false";
    element.className = "popup__wrapper";
    roundPositionElement.className = "round-position";
  }
};

const makeSlide = (item) => {
  // 노드 생성
  let slideCard = document.createElement("a");

  let imgWrapper = document.createElement("div");
  let picFirst = document.createElement("img");
  let picSecond = document.createElement("img");

  let infoWrapper = document.createElement("div");
  let infoTextWrapper = document.createElement("h3");
  let infoHeader = document.createElement("span");
  let infoDesc = document.createElement("span");
  let infoPirceWrapper = document.createElement("div");
  let infoPirce = document.createElement("p");

  let cartWrapper = document.createElement("div");
  let cartBtn = document.createElement("button");
  let cartIcon = document.createElement("i");
  let heartBtn = document.createElement("button");
  let heartIcon = document.createElement("i");

  slideCard.className = "swiper-slide item";
  imgWrapper.className = "img-wrapper";
  picFirst.className = "pic-first";
  picSecond.className = "pic-second";
  infoWrapper.className = "info-wrapper";
  infoTextWrapper.className = "text-bold";
  infoHeader.className = "info__header";
  infoDesc.className = "info__desc";
  infoPirceWrapper.className = "info__price text-bold";

  cartWrapper.className = "cart-wrapper";
  cartBtn.className = "btn-cart";
  cartIcon.className = "cart bi bi-basket2-fill";
  heartBtn.className = "btn-heart";
  heartIcon.className = "heart bi bi-heart";

  // json data append
  picFirst.src = item.firstPictureSrc;
  picSecond.src = item.secondPictureSrc;
  slideCard.href = item.link;

  infoHeader.append(item.title);
  infoDesc.append(item.description);

  infoPirce.append(item.price);

  // node fetching
  imgWrapper.append(picFirst);
  imgWrapper.append(picSecond);

  infoTextWrapper.append(infoHeader);
  infoTextWrapper.append(infoDesc);

  infoPirceWrapper.append(infoPirce);

  cartBtn.append(cartIcon);
  heartBtn.append(heartIcon);
  cartWrapper.append(cartBtn);
  cartWrapper.append(heartBtn);

  infoWrapper.append(infoTextWrapper);
  infoWrapper.append(infoPirceWrapper);
  infoWrapper.append(cartWrapper);

  slideCard.append(imgWrapper);
  slideCard.append(infoWrapper);

  return slideCard;

  // 텍스트 노드 생성
  // const infoHeaderText = document.createTextNode(it.title);
  // const infoDescText = document.createTextNode(it.description);
  // const priceText = document.createTextNode(it.price);
  // const discountPriceText = document.createTextNode(it.discountPrice);
};

// json data 불러오기
const setJsonData = () => {
  //JSON 객체 생성
  let json = JSON.parse(JSON.stringify(productInformation));
  let fragment = document.createDocumentFragment();
  let fragment2 = document.createDocumentFragment();

  let parentItem = document.getElementById("swiper-wrapper");

  // 노드 추가 순환
  json.forEach((item) => {
    let parent = document.getElementById(item.imageID);

    item.data.forEach((it) => {
      const slideCard = makeSlide(it);

      // 노드 생성
      let roundPosition = document.createElement("div");
      let innerRound = document.createElement("div");
      let round = document.createElement("div");
      let popupWrapper = document.createElement("div");

      let a = document.createElement("a");
      let title = document.createElement("h3");
      let desc = document.createElement("h4");
      let price = document.createElement("p");
      let discountPrice = document.createElement("p");

      // 텍스트 노드 생성
      const titleText = document.createTextNode(it.title);
      const descText = document.createTextNode(it.description);
      const priceText = document.createTextNode(it.price);
      const discountPriceText = document.createTextNode(it.discountPrice);

      // 텍스트 매칭
      title.appendChild(titleText);
      desc.appendChild(descText);
      price.appendChild(priceText);
      discountPrice.appendChild(discountPriceText);

      a.append(title);
      a.append(desc);
      a.append(price);

      setPopupByLink(a, it.popup, it.link);
      setAriaHidden(popupWrapper, roundPosition, it.hidden);

      round.className = "round";
      innerRound.className = "inner-round";
      a.className = "popup";

      popupWrapper.append(a);
      round.append(innerRound);
      roundPosition.append(popupWrapper);
      roundPosition.append(round);

      roundPosition.style.top = it.axisY;
      roundPosition.style.left = it.axisX;

      getPositionByDirection(it.direction, a);

      fragment.append(roundPosition);
      fragment2.append(slideCard);

      console.log(slideCard);
    });

    parent.append(fragment);
    parentItem.append(fragment2);
    //parentItem.append(childItem);
  });
};

(function () {
  setJsonData();

  const photoItems = document.querySelectorAll(".photo");

  photoItems.forEach(function (photo) {
    const popupWrapperItem = photo.querySelector(".popup__default");
    const roundPositionItem = photo.querySelector(".round-position__default");

    photo.addEventListener("mouseout", function (event) {
      popupWrapperItem.dataset.hidden = "true";
    });

    photo.addEventListener("mouseover", function (event) {
      popupWrapperItem.dataset.hidden = "false";
    });

    roundPositionItem.addEventListener("mouseenter", function (event) {
      popupWrapperItem.dataset.hidden = "true";
    });
  });
})();

// footer accordion
const acc = document.getElementsByClassName("acc");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("active");
    this.classList.toggle("acc_icon--active");
  });
}

// swiper slide DOM 생성 함수
const createSwiperSlide = ({ name }) => {
  const swiperSlide = document.createElement("div");
  swiperSlide.className = "swiper-slide";
  swiperSlide.innerHTML = name;

  return swiperSlide;
};
