import { StartTimer } from './helpers';
import type {
  Game,
  RenderAppSelection,
  RenderAppGame,
  RenderAppStartGame,
  RenderAppFinish,
} from './types';

export function renderAppSelection({ appEl, chooseLevel }: RenderAppSelection) {
  const appHtml = `<div class="app__set">
    <form class="box">
      <h1 class="box__heading">Выбери</br>сложность</h1>
      <div class="box__level-box">
        <input type="radio" id="difficulty-easy" name="difficulty" value="1" class="box__difficulty-input">
        <label for="difficulty-easy" class="box__level">1</label>

        <input type="radio" id="difficulty-medium" name="difficulty" value="2" class="box__difficulty-input">
        <label for="difficulty-medium" class="box__level">2</label>

        <input type="radio" id="difficulty-hard" name="difficulty" value="3" class="box__difficulty-input">
        <label for="difficulty-hard" class="box__level">3</label>
      </div>
      <button type="submit" class="button" id="button">Старт</button>
    </form>
  </div>`;
  appEl.innerHTML = appHtml;
  const levels: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    'input[type="radio"]',
  );
  const setButton = document.querySelector('#button') as HTMLButtonElement;

  setButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    for (const level of levels) {
      if (level.checked) {
        chooseLevel(Number(level.value));
      }
    }
  });
}

function createCards(game: Game) {
  let cards = '';
  for (let i = 0; i < game.cards.length; i++) {
    const card = game.cards[i].split(' ');
    cards =
      cards +
      `<div class="card">
      <div class="card__name-container">
        <div class="card__name">
          <p class="card__rank">${card[0]}</p>
          <img src="./${card[1]}" alt="" class="card__suit_small">
        </div>
      </div>
      <div class="card__suit">
        <img src="./${card[1]}" alt="" class="card__suit_big">
      </div>
      <div class="card__name-container reverse">
        <div class="card__name">
          <p class="card__rank">${card[0]}</p>
          <img src="./${card[1]}" alt="" class="card__suit_small">
        </div>
      </div>
    </div> 
    `;
  }
  return cards;
}

export function renderAppGame({ appEl, startGame, game }: RenderAppGame) {
  const appHtml = `<div class="app__game">
    <div class="top">
      <div class="time">
        <div class="time__name">
          <p>min</p>
          <p>sek</p>
        </div>
        <p class="time__timer">00.00</p>
      </div>
      <button class="button">Начать заново</button>
    </div>
    <div class="cards">
      ${createCards(game)}
    </div>
  </div>`;
  appEl.innerHTML = appHtml;
  const button = document.querySelector('.button') as HTMLButtonElement;
  button.addEventListener('click', () => {
    startGame();
  });
}

export function renderAppStartGame({
  appEl,
  game,
  startGame,
  onCardClick,
}: RenderAppStartGame) {
  function createCardsShirts(numberOfCards: number) {
    let cards = '';
    for (let i = 0; i < numberOfCards; i++) {
      cards =
        cards +
        '<div class="cards__shirt"> <img src="./static/card_shirt.png" alt="" class="cards__shirt_img"> </div>';
    }
    return cards;
  }
  const appHtml = `<div class="app__game">
    <div class="top">
      <div class="time">
        <div class="time__name">
          <p>min</p>
          <p>sek</p>
        </div>
        <p class="time__timer">00.00</p>
      </div>
      <button class="button">Начать заново</button>
    </div>
    <div class="cards">
      ${createCardsShirts(game.cards.length)}
    </div>
  </div>
  `;
  appEl.innerHTML = appHtml;
  const cards = document.querySelectorAll(
    '.cards__shirt',
  ) as NodeListOf<HTMLDivElement>;

  for (let i = 0; i < game.cards.length; i++) {
    cards[i].addEventListener('click', () => {
      if (game.chosenCards.includes(i)) {
        return;
      }
      onCardClick({ cards, index: i });
    });
  }
  StartTimer({ game });
  const button = document.querySelector('.button') as HTMLButtonElement;
  button.addEventListener('click', () => {
    clearInterval(game.timerId);
    startGame();
  });
}

export function turnCard(
  cards: NodeListOf<HTMLDivElement>,
  index: number,
  card: string[],
) {
  cards[index].innerHTML = `<div class="card__name-container">
  <div class="card__name">
    <p class="card__rank">${card[0]}</p>
    <img src="./${card[1]}" alt="" class="card__suit_small">
  </div>
</div>
<div class="card__suit">
  <img src="./${card[1]}" alt="" class="card__suit_big">
</div>
<div class="card__name-container reverse">
  <div class="card__name">
    <p class="card__rank">${card[0]}</p>
    <img src="./${card[1]}" alt="" class="card__suit_small">
  </div>
</div>
`;
}

export function renderAppFinish({
  result,
  game,
  popup,
  startGame,
}: RenderAppFinish) {
  game.numberOfFindePair = 0;
  clearInterval(game.timerId);
  popup.innerHTML = `<div class="popup__body">
    <div class="popup__content box">
      <img ${
        result ? 'src="./static/celebration.png"' : 'src="./static/dead.png"'
      } alt="" class="popup__img">
      <h1 class="box__heading">${result ? 'Вы выиграли!' : 'Вы проиграли!'}</h1>
      <p class="popup__text">Затраченное время:</p>
      <p class="popup__text_time">${game.time}</p>
      <button class="button popup__button">Играть снова</button>
    </div>
  </div>
  `;
  popup.style.display = 'flex';

  const popupButton = document.querySelector(
    '.popup__button',
  ) as HTMLButtonElement;
  popupButton.addEventListener('click', () => {
    startGame();
  });
}
