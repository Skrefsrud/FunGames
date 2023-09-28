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

class Player {
  constructor(money, cards) {
    this.money = money;
    this.cards = [];
  }
  getCards() {
    return this.cards;
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
let amountOfCardsHit = 0;

function hitCard() {
  const rNum = Math.floor(Math.random() * 52);
  let card = deckOfCards[rNum];
  deckOfCards.splice(rNum, 1);
  player.addCard(card);
  renderCards();
  amountOfCardsHit++;
}

function skipCard() {}

function renderCards() {
  let playerCardsContainer = document.querySelector(".playerCards");
  let currentPlayerCards = player.getCards();
  console.log(currentPlayerCards[amountOfCardsHit].getNumber());
  let cardDisplay = document.createElement("div");
  let cardDisplayValue = document.createElement("p");
  let cardDisplaySort = document.createElement("p");

  cardDisplay.classList.add("cardDisplay");
  cardDisplayValue.classList.add("cardDisplayValue");
  cardDisplayValue.textContent = `${currentPlayerCards[
    amountOfCardsHit
  ].getNumber()}`;
  cardDisplaySort.classList.add("classDisplaySort");
  cardDisplaySort.textContent = `${currentPlayerCards[
    amountOfCardsHit
  ].getSort()}`;
  cardDisplay.appendChild(cardDisplayValue);
  cardDisplay.appendChild(cardDisplaySort);
  playerCardsContainer.appendChild(cardDisplay);
}
