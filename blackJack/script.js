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
console.log(deckOfCards);
