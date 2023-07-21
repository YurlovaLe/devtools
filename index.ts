import './style.css';
import {
  renderAppSelection,
  renderAppGame,
  renderAppStartGame,
  renderAppFinish,
  turnCard,
} from './render';
import type { Game, OnCardClick } from './types';

const game: Game = {
  difficulty: 0,
  time: '0',
  isWin: false,
  cards: [],
  chosenCards: [],
  numberOfFindePair: 0,
  timerId: 0,
};

const appEl = document.getElementById('app') as HTMLDivElement;
const popup = document.querySelector('.popup') as HTMLDivElement;

function chooseLevel(value: number) {
  game.difficulty = value;
  const numberOfCards = game.difficulty * 6;
  createRandomCardDeck(numberOfCards);
  renderAppGame({ appEl, startGame, game });
  setTimeout(renderAppStartGame, 5000, {
    numberOfCards,
    appEl,
    game,
    startGame,
    onCardClick,
  });
}

function createRandomCardDeck(numberOfCards: number) {
  function createCardDeck() {
    const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6'];
    const suits = [
      './static/spades.svg',
      './static/hearts.svg',
      './static/diamonds.svg',
      './static/clubs.svg',
    ];
    const cards = [];
    for (let j = 0; j < suits.length; j++) {
      for (let i = 0; i < ranks.length; i++) {
        cards.push(ranks[i] + ' ' + suits[j]);
      }
    }
    return cards;
  }
  const cardDeck = createCardDeck();
  const randomCards: string[] = [];

  for (let i = 0; i < numberOfCards / 2; i++) {
    const randome: number = Math.floor(Math.random() * (36 - i));
    randomCards.push(cardDeck[randome]);
    randomCards.push(cardDeck[randome]);
    cardDeck.splice(randome, 1);
  }

  for (let i = 0; i < numberOfCards; i++) {
    const randome = Math.floor(Math.random() * (numberOfCards - i));
    game.cards.push(randomCards[randome]);
    randomCards.splice(randome, 1);
  }
}

function onCardClick({ cards, index }: OnCardClick) {
  if (game.chosenCards.length < game.cards.length) {
    const card = game.cards[index].split(' ');
    game.chosenCards.push(index);
    turnCard(cards, index, card);
    if (game.chosenCards.length % 2 === 0) {
      const i = game.chosenCards.length;
      game.cards[game.chosenCards[i - 1]] ===
      game.cards[game.chosenCards[i - 2]]
        ? game.numberOfFindePair++
        : renderAppFinish({
            result: false,
            game,
            popup,
            startGame,
          });
    }
    if (game.numberOfFindePair * 2 === game.cards.length) {
      renderAppFinish({
        result: true,
        game,
        popup,
        startGame,
      });
    }
  }
}

function startGame() {
  popup.style.display = 'none';
  game.difficulty = 0;
  game.time = '0';
  game.cards = [];
  game.chosenCards = [];
  game.numberOfFindePair = 0;

  renderAppSelection({ appEl, chooseLevel });
}

startGame();
