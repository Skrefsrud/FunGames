// class for single Card
class Card {
  constructor(number, sort) {
    this.number = number;
    this.sort = sort;
  }

  getNumber() {
    return this.number;
  }
  getSort() {
    return this.sort;
  }
}

// Class for both player and dealer
class Player {
  constructor(money, name) {
    this.money = money;
    this.cards = [];
    this.name = name;
  }
  getCards() {
    return this.cards;
  }

  getAmountOfCards() {
    return this.cards.length;
  }
  addCard(card) {
    this.cards.push(card);
  }

  removeCards() {
    this.cards = [];
  }

  getMoney() {
    return this.money;
  }

  addMoney(sum) {
    this.money += sum;
    renderPlayerMoney();
  }

  removeMoney(sum) {
    this.money -= sum;
    renderPlayerMoney();
  }

  getSum() {
    let sum = 0;
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].getNumber() < 10) {
        sum += this.cards[i].getNumber();
      } else {
        sum += 10;
      }
    }
    return sum;
  }

  getName() {
    return this.name;
  }
}

let sorts = ["♣", "♦", "♥", "♠"];
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

// function to create a deck
function createDeck() {
  let cards = [];
  for (let i = 0; i < sorts.length; i++) {
    for (let y = 0; y < numbers.length; y++) {
      let card = new Card(numbers[y], sorts[i]);
      cards.push(card);
    }
  }
  return cards;
}

let deckOfCards = createDeck();
let player = new Player(1000, "player");
let dealer = new Player(1000, "dealer");
let betAmount = 0;

//Function for resetting game
function resetGame() {
  player.removeCards();
  dealer.removeCards();
  deckOfCards = createDeck();
  let prevCards = document.querySelectorAll(".cardForRemove");
  prevCards.forEach((element) => {
    element.remove();
  });
  document.getElementById(
    "player-sum"
  ).innerHTML = `Player sum: ${player.getSum()}`;
  document.getElementById(
    "dealer-sum"
  ).innerHTML = `Dealer sum: ${dealer.getSum()}`;
  let lScreen = document.getElementById("lostScreen");
  if (lScreen === null) {
    document.getElementById("wonScreen").remove();
  } else {
    lScreen.remove();
  }
  dealButton.classList.remove("hide");
  betAmount = 0;
  while (betContainer.firstChild) {
    betContainer.removeChild(betContainer.firstChild);
  }
}

let deckAmount = 52;
function getRandomFromDeckAmount() {
  let rNum = Math.floor(Math.random() * deckAmount);
  deckAmount -= 1;
  return rNum;
}

//Functions for giving player and dealer a new card and removing it from the deck

function hitPlayerCard() {
  let rNum = getRandomFromDeckAmount();
  let card = deckOfCards[rNum];
  player.addCard(card);
  deckOfCards.splice(rNum, 1);
  renderPlayerCards();
  if (player.getSum() > 21) {
    playerLost();
  }
}

function playerLost() {
  dealer.addMoney(betAmount);
  let div = document.createElement("div");
  div.setAttribute("id", "lostScreen");
  let btn = document.createElement("button");
  btn.innerHTML = "New round";
  btn.classList.add("newRoundBtn");
  btn.addEventListener("click", function () {
    resetGame();
  });
  div.appendChild(btn);
  let h1 = document.createElement("h1");
  h1.innerHTML = "DEALER WON!";
  div.appendChild(h1);
  document.body.appendChild(div);
}

function playerWon() {
  player.addMoney(betAmount * 2);
  dealer.removeMoney(betAmount);
  let div = document.createElement("div");
  div.setAttribute("id", "wonScreen");
  let btn = document.createElement("button");
  btn.innerHTML = "New round";
  btn.classList.add("newRoundBtn");
  btn.addEventListener("click", function () {
    resetGame();
  });
  div.appendChild(btn);
  let h1 = document.createElement("h1");
  h1.innerHTML = "PLAYER WON!";
  div.appendChild(h1);
  document.body.appendChild(div);
}

function renderPlayerMoney() {
  let moneyDisplay = document.getElementById("player-money");
  moneyDisplay.innerHTML = `${player.getMoney()}$`;
  let dealerMoneyDispaly = document.getElementById("dealer-money");
  dealerMoneyDispaly.innerHTML = `${dealer.getMoney()}$`;
}

function hitDealerCard() {
  const rNum = getRandomFromDeckAmount();
  let card = deckOfCards[rNum];
  dealer.addCard(card);
  deckOfCards.splice(rNum, 1);
  renderDealerCards();
}

let dealButton = document.querySelector(".dealCards");

// give dealer and player two cards each
function dealCards() {
  for (let i = 0; i < 2; i++) {
    hitPlayerCard();
    hitDealerCard();
  }
  dealButton.classList.add("hide");
}

function stand() {
  while (dealer.getSum() < player.getSum()) {
    hitDealerCard();
  }
  if (dealer.getSum() > 21) {
    playerWon();
  } else if (dealer.getSum() === player.getSum()) {
    playerWon();
  } else {
    playerLost();
  }
}

//functions for rendering player and dealers cards
let gameContainer = document.querySelector(".game-container");

function renderPlayerCards() {
  let currentPlayerCards = player.getCards();
  let currentCard = currentPlayerCards[player.getAmountOfCards() - 1];

  // Card animation for player

  let cardImage = document.createElement("img");
  cardImage.setAttribute(
    "class",
    `player-card ${dealer.getAmountOfCards()} cardForRemove`
  );
  cardImage.src = getImageSrc(currentCard);
  //cardImage.setAttribute("src", getImageSrc(currentCard));
  gameContainer.appendChild(cardImage);

  startAnimation(cardImage, player);

  document.getElementById(
    "player-sum"
  ).innerHTML = `Player sum: ${player.getSum()}`;
}

function renderDealerCards() {
  let currentDealerCards = dealer.getCards();
  let currentCard = currentDealerCards[dealer.getAmountOfCards() - 1];

  //animate the card to the board

  let cardImage = document.createElement("img");
  cardImage.setAttribute(
    "class",
    `dealer-card ${dealer.getAmountOfCards()} cardForRemove`
  );
  cardImage.src = getImageSrc(currentCard);
  //cardImage.setAttribute("src", getImageSrc(currentCard));
  gameContainer.appendChild(cardImage);

  startAnimation(cardImage, dealer);

  //rendering the dealer sum

  document.getElementById(
    "dealer-sum"
  ).innerHTML = `Dealer sum: ${dealer.getSum()}`;
}

//Delaer animation
function startAnimation(cardImage, playMaker) {
  if (playMaker.getName() === "dealer") {
    var newTop = "7%";
  } else if (playMaker.getName() === "player") {
    var newTop = "52%";
  }
  const animationProperties = [
    { left: "4%", top: "30%", transform: "rotate(0deg)" },
    {
      left: newLeftPrecentage(playMaker),
      top: newTop,
      transform: "rotate(180deg)",
    },
  ];

  // Create a new animation
  const animation = cardImage.animate(animationProperties, {
    duration: 300, // Animation duration in milliseconds (1 second in this case)
    fill: "forwards", // Keep the final state of the animation
  });

  // Start the animation immediately
  animation.play();
}

function newLeftPrecentage(playMaker) {
  let extraSum = playMaker.getAmountOfCards() * 12;
  let newLeftAmount = 15 + extraSum;
  return `${newLeftAmount}%`;
}
// logic for selecting bet amount

let chips = document.querySelectorAll(".chip");
let betContainer = document.getElementById("bet-container");
chips.forEach((chip) => {
  //add value of clicked chip to the betAmount
  chip.addEventListener("click", (e) => {
    let chipValue = Number(chip.getAttribute("value"));
    betAmount += chipValue;
    player.removeMoney(chipValue);
    let clonedChip = chip.cloneNode(true);
    clonedChip.classList.remove("chip");
    clonedChip.classList.add("cloneChip");
    betContainer.appendChild(clonedChip);
  });
  chip.addEventListener("mouseover", function () {
    // Add a class to the hovered chip to change its width
    chip.classList.add("hovered");

    // Remove the class from other chips to reset their width
    chips.forEach((otherChip) => {
      if (otherChip !== chip) {
        otherChip.classList.remove("hovered");
      }
    });
  });

  chip.addEventListener("mouseout", function () {
    // Remove the class when the mouse leaves to reset the width
    chip.classList.remove("hovered");
  });
});

function getImageSrc(card) {
  let source = "";
  "♣", "♦", "♥", "♠";
  if (card.getSort() === "♣") {
    source = `img/clubs_${card.getNumber()}.png`;
  } else if (card.getSort() === "♦") {
    source = `img/diamonds_${card.getNumber()}.png`;
  } else if (card.getSort() === "♥") {
    source = `img/hearts_${card.getNumber()}.png`;
  } else if (card.getSort() === "♠") {
    source = `img/spades_${card.getNumber()}.png`;
  } else {
    console.log("something went wrong getting image source");
  }
  return source;
}
