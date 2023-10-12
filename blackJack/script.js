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
  constructor(money) {
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
let betAmount = 0;

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
