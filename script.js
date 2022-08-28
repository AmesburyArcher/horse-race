// Suits
const suits = ['Spades', 'Clubs', 'Hearts', 'Diamonds'];

// Values minus Ace
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Aces
const aces = [
  { Suit: 'Spades', Value: 'Ace' },
  { Suit: 'Clubs', Value: 'Ace' },
  { Suit: 'Hearts', Value: 'Ace' },
  { Suit: 'Diamonds', Value: 'Ace' },
];

const cardProgress = [0, 0, 0, 0];

const sideCards = [];

let aceSpades = 7;
let aceClubs = 7;
let aceHearts = 7;
let aceDiamonds = 7;

const createDeck = () => {
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      let card = {
        Suit: suits[i],
        Value: values[x],
      };
      deck.push(card);
    }
  }
  return deck;
};

const shuffleDeck = (deck) => {
  lengthDeck = deck.length;
  for (let i = lengthDeck - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
};

const addSideCards = () => {
  for (let i = 0; i < 5; i++) {
    sideCards.push(deck[i]);
  }
};

const cardBack = (card) => {
  suit = card.Suit;
  cardStr = `ace${suit}`;
  console.log(cardStr);
  card.style.gridRow = `${cardStr - 1} / ${cardStr}`;
};
