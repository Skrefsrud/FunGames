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
  constructor(money, cards) {
    this.money = money;
    this.cards = [];
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
  }

  removeMoney(sum) {
    this.money -= sum;
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
let player = new Player(1000);
let dealer = new Player(1000);
let betAmount = 250;

//Function for resetting game
function resetGame() {
  player.removeCards();
  dealer.removeCards();
  deckOfCards = createDeck();
  document.querySelector(".playerCards").innerHTML = "";
  document.querySelector(".dealerCards").innerHTML = "";
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
}

//Functions for giving player and dealer a new card and removing it from the deck

function hitPlayerCard() {
  const rNum = Math.floor(Math.random() * 52);
  let card = deckOfCards[rNum];
  deckOfCards.splice(rNum, 1);
  player.addCard(card);
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
  dealer.addMoney(betAmount * 2);
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
  renderPlayerMoney();
}

function renderPlayerMoney() {
  let moneyDisplay = document.getElementById("player-money");
  moneyDisplay.innerHTML = `${player.getMoney()}$`;
}

function hitDealerCard() {
  const rNum = Math.floor(Math.random() * 52);
  let card = deckOfCards[rNum];
  deckOfCards.splice(rNum, 1);
  dealer.addCard(card);
  renderDealerCards();
}

// give dealer and player two cards each
function dealCards() {
  for (let i = 0; i < 2; i++) {
    hitPlayerCard();
    hitDealerCard();
  }
}

function stand() {
  while (dealer.getSum() < player.getSum()) {
    hitDealerCard();
  }
  if (dealer.getSum() > 21) {
    playerWon();
  } else {
    playerLost();
  }
}

//functions for rendering player and dealers cards

function renderPlayerCards() {
  let playerCardsContainer = document.querySelector(".playerCards");
  let currentPlayerCards = player.getCards();
  let cardDisplay = document.createElement("div");
  let cardDisplayValue = document.createElement("p");
  let cardDisplaySort = document.createElement("p");

  cardDisplay.classList.add("cardDisplay");
  cardDisplayValue.classList.add("cardDisplayValue");
  cardDisplayValue.textContent = `${currentPlayerCards[
    player.getAmountOfCards() - 1
  ].getNumber()}`;
  cardDisplaySort.classList.add("classDisplaySort");
  cardDisplaySort.textContent = `${currentPlayerCards[
    player.getAmountOfCards() - 1
  ].getSort()}`;
  cardDisplay.appendChild(cardDisplayValue);
  cardDisplay.appendChild(cardDisplaySort);
  playerCardsContainer.appendChild(cardDisplay);

  document.getElementById(
    "player-sum"
  ).innerHTML = `Player sum: ${player.getSum()}`;
}

function renderDealerCards() {
  let dealerCardsContainer = document.querySelector(".dealerCards");
  let currentDealerCards = dealer.getCards();
  let cardDisplay = document.createElement("div");
  let cardDisplayValue = document.createElement("p");
  let cardDisplaySort = document.createElement("p");

  cardDisplay.classList.add("cardDisplay");
  cardDisplayValue.classList.add("cardDisplayValue");
  cardDisplayValue.textContent = `${currentDealerCards[
    dealer.getAmountOfCards() - 1
  ].getNumber()}`;
  cardDisplaySort.classList.add("classDisplaySort");
  cardDisplaySort.textContent = `${currentDealerCards[
    dealer.getAmountOfCards() - 1
  ].getSort()}`;
  cardDisplay.appendChild(cardDisplayValue);
  cardDisplay.appendChild(cardDisplaySort);
  dealerCardsContainer.appendChild(cardDisplay);

  document.getElementById(
    "dealer-sum"
  ).innerHTML = `Dealer sum: ${dealer.getSum()}`;
}
