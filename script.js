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
