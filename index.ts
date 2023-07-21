import './style.css';
import {
  renderAppSelection,
  renderAppGame,
  renderAppStartGame,
  renderAppFinish,
  turnCard,
} from './render';
import { createRandomCardDeck } from './deckHelpers';
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
  game.cards = createRandomCardDeck(numberOfCards);
  renderAppGame({ appEl, startGame, game });
  setTimeout(renderAppStartGame, 5000, {
    numberOfCards,
    appEl,
    game,
    startGame,
    onCardClick,
  });
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
