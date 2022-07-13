// direction에 따라 round icon 기준 popup 위치 설정
const getPositionByDirection = (direction, element) => {
  switch (direction) {
    case "top":
      element.style.top = "-6rem";
      element.style.right = "-4.3rem";
      break;
    case "bottom":
      element.style.top = "2rem";
      element.style.right = "-4.2rem";
      break;
    case "right":
      element.style.top = "-3rem";
      element.style.right = "-10rem";
      break;
    case "left":
      element.style.top = "-3.3rem";
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

// aria-hiddeen 초기 설정 : aria-hidden에 따라 popup이 활성화 및 비활성화됨
const setAriaHidden = (
  popupWrapperElement,
  roundPositionElement,
  defaultShowState
) => {
  if (defaultShowState == true) {
    popupWrapperElement.className = "popup__default popup__wrapper";
    roundPositionElement.className = "round-position__default round-position";
    roundPositionElement.dataset.hidden = "true";
  } else {
    popupWrapperElement.className = "popup__wrapper";
    roundPositionElement.className = "round-position";
    roundPositionElement.dataset.hidden = "false";
  }
};

// 슬라이더 아이템 노드 추가
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

  // 클래스 이름 부여
  slideCard.className = "swiper-slide item";
  imgWrapper.className = "img-wrapper";
  picFirst.className = "pic-first";
  picSecond.className = "pic-second";
  infoWrapper.className = "info-wrapper";
  infoTextWrapper.className = "text-bold";
  infoHeader.className = "info__header";
  infoDesc.className = "info__desc";
  infoPirce.className = "price";
  infoPirceWrapper.className = "info__price text-bold";

  cartWrapper.className = "cart-wrapper";
  cartBtn.className = "btn-cart";
  cartIcon.className = "cart bi bi-basket2-fill";
  heartBtn.className = "btn-heart";
  heartIcon.className = "heart bi bi-heart";

  // 아이템의 할인 정보 불러오기
  const discountPriceInfo = getDiscountPrice(
    item.discountStartDate,
    item.discountEndDate,
    item.discountPrice,
    item.discountPercent,
    infoPirce
  );

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
  infoPirceWrapper.append(discountPriceInfo);

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
};

// 할인기간 내 할인가 표시
const getDiscountPrice = (
  discountStartDate,
  discountEndDate,
  discountPrice,
  discountPercent,
  priceNode
) => {
  const time = new Date();

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();

  const currDate = `${year}-${month}-${day} ${hour}:${minute}`;

  const formattedCurrDate = new Date(currDate);
  const formattedDiscountStartDate = new Date(discountStartDate);
  const formattedDiscountEndDate = new Date(discountEndDate);

  let discountPriceNode = document.createElement("p");
  let discountPercentNode = document.createElement("span");

  discountPriceNode.className = "";
  discountPercentNode.className = "";

  // 할인기간내 속한 아이템일 경우 discount price와 percent에 클래스 이름 부여
  if (
    formattedDiscountEndDate >= formattedCurrDate &&
    formattedDiscountStartDate <= formattedCurrDate
  ) {
    discountPriceNode.className = "discount-price";
    discountPercentNode.className = "discount-percent";

    const discountPriceText = document.createTextNode(discountPrice);
    const discountPercentText = document.createTextNode(discountPercent);

    discountPriceNode.appendChild(discountPriceText);
    discountPercentNode.appendChild(discountPercentText);

    priceNode.className = "price--discount";
  }
  discountPriceNode.append(discountPercentNode);

  return discountPriceNode;
};

// productInformation 데이터 불러오기
const setJsonData = () => {
  let json = JSON.parse(JSON.stringify(productInformation));
  let fragment = document.createDocumentFragment();
  let fragment2 = document.createDocumentFragment();

  let sections = document.getElementsByClassName("section");

  let sectionIndex = 0;

  json.forEach((item) => {
    const section = sections[sectionIndex];
    const sliderWrapper = section.querySelector(".swiper-wrapper");
    const photos = section.getElementsByClassName("photo");

    let photoIndex = 0;

    item.dataList.forEach((item) => {
      let photo = photos[photoIndex];

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

        // 텍스트 노드 생성
        const titleText = document.createTextNode(it.title);
        const descText = document.createTextNode(it.description);
        const priceText = document.createTextNode(it.price);

        // 노드에 class명 설정
        price.className = "price";
        round.className = "round";
        innerRound.className = "inner-round";
        a.className = "popup";

        const discountPriceInfo = getDiscountPrice(
          it.discountStartDate,
          it.discountEndDate,
          it.discountPrice,
          it.discountPercent,
          price
        );

        // 텍스트 매칭
        title.appendChild(titleText);
        desc.appendChild(descText);
        price.appendChild(priceText);

        a.append(title);
        a.append(desc);
        a.append(price);

        a.append(discountPriceInfo);

        setPopupByLink(a, it.popup, it.link);
        setAriaHidden(popupWrapper, roundPosition, it.defaultShow);

        popupWrapper.append(a);
        round.append(innerRound);
        roundPosition.append(popupWrapper);
        roundPosition.append(round);

        roundPosition.style.top = it.axisY;
        roundPosition.style.left = it.axisX;

        getPositionByDirection(it.direction, a);

        fragment.append(roundPosition);
        fragment2.append(slideCard);
      });

      photo.append(fragment);
      sliderWrapper.append(fragment2);
      photoIndex += 1;
    });
    sectionIndex += 1;
  });
};

// 말풍선 처리 설정
(function () {
  setJsonData();

  const photoItems = document.querySelectorAll(".photo");

  photoItems.forEach(function (photo) {
    const defaultRounudPositionItem = photo.querySelector(
      ".round-position__default"
    );
    const roundPositionItems = photo.getElementsByClassName("round-position");
    const activeRoundPositionItems = photo.querySelectorAll(
      '[data-hidden="true"]'
    );

    // 사진에서 마우스가 벗어나면 기본 말풍선이 나타남
    photo.addEventListener("mouseleave", function () {
      defaultRounudPositionItem.dataset.hidden = "true";
    });

    // 좌표 아이콘에 마우스를 갖다댈 경우, 기존에 떠있던 말풍선이 사라지고 갖다댄 위치의 말풍선이 나타남
    for (let i = 0; i < roundPositionItems.length; i++) {
      roundPositionItems[i].addEventListener("mouseover", function () {
        activeRoundPositionItems[0].dataset.hidden = "false";
        this.dataset.hidden = "true";
      });
    }

    // 좌표 아이콘에서 마우스를 뗄 경우, 말풍선을 사라지게 함
    for (let i = 0; i < roundPositionItems.length; i++) {
      roundPositionItems[i].addEventListener("mouseleave", function () {
        roundPositionItems[i].dataset.hidden = "false";
      });
    }
  });
})();

// swiper slide DOM 생성 함수
const createSwiperSlide = ({ name }) => {
  const swiperSlide = document.createElement("div");
  swiperSlide.className = "swiper-slide";
  swiperSlide.innerHTML = name;

  return swiperSlide;
};
