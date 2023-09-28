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

function hitCard() {
  const rNum = Math.floor(Math.random() * 52);
  let card = deckOfCards[rNum];
  deckOfCards.splice(rNum, 1);
  player.addCard(card);
  console.log(player);
  console.log(deckOfCards);
}

function skipCard() {}
