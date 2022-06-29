//JSON 객체 생성
let json = JSON.parse(JSON.stringify(productInformation));
let fragment = document.createDocumentFragment();

// 노드 추가 순환
json.forEach((item) => {
  let parent = document.getElementById(item.imageID);

  item.data.forEach((it) => {
    // 노드 생성
    let round = document.createElement("div");
    let innerRoundWrapper = document.createElement("div");
    let innerRound = document.createElement("div");

    let a = document.createElement("a");
    let title = document.createElement("h3");
    let desc = document.createElement("h4");
    let price = document.createElement("p");

    const titleText = document.createTextNode(it.title);
    const descText = document.createTextNode(it.description);
    const priceText = document.createTextNode(it.price);

    title.appendChild(titleText);
    desc.appendChild(descText);
    price.appendChild(priceText);

    a.append(title);
    a.append(desc);
    a.append(price);
    a.href = it.link;

    round.className = "round";
    innerRoundWrapper.className = "inner-round__wrapper";
    innerRound.className = "inner-round";
    a.className = "popup";

    innerRoundWrapper.append(a);
    round.append(innerRound);
    round.append(innerRoundWrapper);

    round.style.top = it.axisY;
    round.style.left = it.axisX;

    // li 노드 추가
    fragment.append(round);
  });

  parent.append(fragment);
});
