// Suits
const suits = ['spades', 'clubs', 'hearts', 'diamonds'];

// Values minus Ace
const values = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king',
];

// Aces
const aces = [
  { Suit: 'spades', Value: 'Ace' },
  { Suit: 'clubs', Value: 'Ace' },
  { Suit: 'hearts', Value: 'Ace' },
  { Suit: 'diamonds', Value: 'Ace' },
];

// [0]:spades [1]:clubs [2]:hearts [3]:diamonds
const cardProgress = [0, 0, 0, 0];
//array to hold side cards
const sideCards = [];
//array to hold ace elements same order as cardProgress
const acesDOM = [];

const gameSize = () => {
  const g4 = document.querySelector('.btn4');
  const g5 = document.querySelector('.btn5');
  const g6 = document.querySelector('.btn6');

  const mainHolder = document.querySelector('.main-cards');
  const sideHolder = document.querySelector('.side-cards');

  const temp4 = () => {
    mainHolder.style.gridTemplateRows = '1fr 1fr 1fr 1fr 1fr 1fr 1fr';
    mainHolder.style.display = 'grid';
    sideHolder.style.display = 'grid';
    sideHolder.style.gridTemplateRows = '1fr 1fr 1fr 1fr 1fr 1fr 1fr';

    createBoard(7);
    removeEvent();
  };
  const temp5 = () => {
    mainHolder.style.gridTemplateRows = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
    mainHolder.style.display = 'grid';
    sideHolder.style.display = 'grid';
    sideHolder.style.gridTemplateRows = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';

    createBoard(8);
    removeEvent();
  };
  const temp6 = () => {
    mainHolder.style.gridTemplateRows = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
    mainHolder.style.display = 'grid';
    sideHolder.style.display = 'grid';
    sideHolder.style.gridTemplateRows = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';

    createBoard(9);
    removeEvent();
  };

  const removeEvent = () => {
    g4.removeEventListener('click', temp4);
    g5.removeEventListener('click', temp5);
    g6.removeEventListener('click', temp6);
  };

  const reset = document.querySelector('.reset-btn');
  reset.addEventListener('click', function () {
    location.reload();
  });

  g4.addEventListener('click', temp4);
  g5.addEventListener('click', temp5);
  g6.addEventListener('click', temp6);
};

const init = () => {
  gameSize();
};

const createBoard = (size) => {
  //create the initial deck
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
  //deck
  const gameDeck = createDeck();

  //shuffle deck randomly;
  const shuffleDeck = (deck) => {
    lengthDeck = deck.length;
    for (let i = lengthDeck - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
  };

  //add cards from deck to side
  const addSideCards = () => {
    for (let i = 0; i < size - 3; i++) {
      sideCards.push(gameDeck[i]);
      gameDeck.splice(i, 1);
    }
    let i = 2;
    const sideHolder = document.querySelector('.side-cards');
    sideCards.forEach((card) => {
      const text = `assets//PNG-cards-1.3/back_card.png`;
      const newSide = document.createElement('img');
      newSide.classList.add('card');
      newSide.style.gridRow = `${size - i} / ${size - i}`;
      newSide.src = text;
      card.DOM = newSide;
      sideHolder.appendChild(newSide);
      i++;
    });
  };

  //create and display the aces
  const createAces = () => {
    const aceHolder = document.querySelector('.main-cards');
    let i = 1;

    aces.forEach((ace) => {
      const text = `assets//PNG-cards-1.3/ace_of_${ace.Suit}.png`;
      const newAce = document.createElement('img');
      newAce.classList.add('card');
      newAce.style.gridColumn = `${0 + i} / ${i + 1}`;
      newAce.style.gridRow = `${size} / ${size}`;
      newAce.src = text;
      acesDOM.push({ card: newAce, position: size });
      aceHolder.appendChild(newAce);
      i++;
    });
  };

  const dealBtn = document.querySelector('.deal-btn');
  dealBtn.style.display = 'block';
  const drawCard = (deck) => {
    const card = deck.splice(0, 1);
    const suit = card[0].Suit;
    const val = card[0].Value;
    const sideCardDOM = document.createElement('img');
    const text = `assets//PNG-cards-1.3/${val}_of_${suit}.png`;
    sideCardDOM.src = text;
    sideCardDOM.classList.add('card');
    sideCardDOM.style.gridRow = size;
    const sideHolder = document.querySelector('.side-cards');
    sideHolder.appendChild(sideCardDOM);
    switch (suit) {
      case 'spades':
        cardProgress[0]++;
        updateAce(0);
        break;
      case 'clubs':
        cardProgress[1]++;
        updateAce(1);
        break;
      case 'hearts':
        cardProgress[2]++;
        updateAce(2);
        break;
      case 'diamonds':
        cardProgress[3]++;
        updateAce(3);
        break;
    }
    checkProgress();
    checkWin();
  };
  const dealBtnFunc = () => {
    drawCard(gameDeck);
  };
  dealBtn.addEventListener('click', dealBtnFunc);

  const createGameProgressMilestones = (sizeBoard) => {
    const arr = [];
    for (let i = 0; i < sizeBoard; i++) {
      arr[i] = i + 2;
    }
    return arr;
  };

  const milestones = createGameProgressMilestones(size);

  const checkProgress = () => {
    let flipSide = true;
    for (let i = 0; i < 4; i++) {
      if (cardProgress[i] < milestones[0]) {
        flipSide = false;
      }
    }
    if (flipSide) {
      milestones.splice(0, 1);
      const sideCard = sideCards.splice(0, 1);
      const sideCardDOM = sideCard[0].DOM;
      const text = `assets//PNG-cards-1.3/${sideCard[0].Value}_of_${sideCard[0].Suit}.png`;
      sideCardDOM.src = text;
      switch (sideCard[0].Suit) {
        case 'spades':
          cardProgress[0]--;
          setTimeout(function () {
            updateAceBack(0);
          }, 500);
          break;
        case 'clubs':
          cardProgress[1]--;
          setTimeout(function () {
            updateAceBack(1);
          }, 500);
          break;
        case 'hearts':
          cardProgress[2]--;
          setTimeout(function () {
            updateAceBack(2);
          }, 500);
          break;
        case 'diamonds':
          cardProgress[3]--;
          setTimeout(function () {
            updateAceBack(3);
          }, 500);
          break;
      }
    }
  };

  const checkWin = () => {
    if (acesDOM.some((ace) => ace.position === 1)) {
      const index = acesDOM.findIndex((ace) => ace.position === 1);
      console.log(index);
      const title = document.querySelector('.title');
      const winner = aces[index].Suit;
      title.textContent = `${winner.replace(
        winner[0],
        winner[0].toUpperCase()
      )} is the Winner!`;
      dealBtn.removeEventListener('click', dealBtnFunc);
      sideCards.forEach((card) => {
        const cardDOM = card.DOM;
        cardDOM.src = `assets//PNG-cards-1.3/${card.Value}_of_${card.Suit}.png`;
      });
    }
  };

  createDeck();
  shuffleDeck(gameDeck);
  createAces();
  addSideCards();
};

const updateAce = (pos) => {
  const ace = acesDOM[pos];
  ace.position--;
  ace.card.style.gridRow = `${ace.position} / ${ace.position}`;
};
const updateAceBack = (pos) => {
  const ace = acesDOM[pos];
  ace.position++;
  ace.card.style.gridRow = `${ace.position} / ${ace.position}`;
};

init();
