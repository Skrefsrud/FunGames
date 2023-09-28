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

  addMoney(sum) {
    this.money += sum;
  }

  removeMoney(sum) {
    this.money -= sum;
  }
}

let sorts = ["♣", "♦", "♥", "♠"];
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

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

//Functions for giving player and dealer a new card and removing it from the deck

function hitPlayerCard() {
  const rNum = Math.floor(Math.random() * 52);
  let card = deckOfCards[rNum];
  deckOfCards.splice(rNum, 1);
  player.addCard(card);
  renderPlayerCards();
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

function stand() {}

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
}
