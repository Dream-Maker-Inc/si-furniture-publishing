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

//JSON 객체 생성
let json = JSON.parse(JSON.stringify(productInformation));
let fragment = document.createDocumentFragment();

// 노드 추가 순환
json.forEach((item) => {
  let parent = document.getElementById(item.imageID);

  item.data.forEach((it) => {
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

    // 텍스트 매칭
    title.appendChild(titleText);
    desc.appendChild(descText);
    price.appendChild(priceText);

    a.append(title);
    a.append(desc);
    a.append(price);
    a.href = it.link;

    roundPosition.className = "round-position";
    round.className = "round";
    innerRound.className = "inner-round";
    popupWrapper.className = "popup__wrapper";
    a.className = "popup";

    popupWrapper.append(a);
    round.append(innerRound);
    roundPosition.append(popupWrapper);
    roundPosition.append(round);

    roundPosition.style.top = it.axisY;
    roundPosition.style.left = it.axisX;

    getPositionByDirection(it.direction, a);

    fragment.append(roundPosition);
  });

  parent.append(fragment);
});

// footer accordion
const acc = document.getElementsByClassName("acc");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("active");
    this.classList.toggle("acc_icon--active");
  });
}
