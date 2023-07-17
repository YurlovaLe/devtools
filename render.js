import { StartTimer } from './helpers.js';

export function renderAppSelection({ appEl, chooseLevel }) {
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
  let levels = document.querySelectorAll('input[type="radio"]');
  let setButton = document.querySelector('#button');

  setButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    for (let level of levels) {
      if (level.checked) {
        chooseLevel(level.value);
      }
    }
  });
}

function createCards(game) {
  let cards = '';
  for (let i = 0; i < game.cards.length; i++) {
    let card = game.cards[i].split(' ');
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

export function renderAppGame({ appEl, startGame, game }) {
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
  let button = document.querySelector('.button');
  button.addEventListener('click', () => {
    startGame();
  });
}

export function renderAppStartGame({ appEl, game, startGame, onCardClick }) {
  function createCardsShirts(numberOfCards) {
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
  let cards = document.querySelectorAll('.cards__shirt');
  for (let i = 0; i < game.cards.length; i++) {
    cards[i].addEventListener('click', () => {
      if (game.chosenCards.includes(i)) {
        return;
      }
      onCardClick({ cards, index: i });
    });
  }
  StartTimer({ game });
  let button = document.querySelector('.button');
  button.addEventListener('click', () => {
    clearInterval(game.timerId);
    startGame();
  });
}

export function turnCard(cards, index, card) {
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

export function renderAppFinish({ result, game, popup, startGame }) {
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

  let popupButton = document.querySelector('.popup__button');
  popupButton.addEventListener('click', () => {
    startGame();
  });
}
