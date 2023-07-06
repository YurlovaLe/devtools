const game = {
  difficulty: undefined,
  time: 0,
  gameStatus: 'selection',
  cards: [],
  chosenCards: [],
}
const appEl = document.getElementById("app");

function renderAppSelection () {
  const appHtml = `<div class="app__set">
  <form class="set">
    <h1 class="set__heading">Выбери</br>сложность</h1>
    <div class="set__level-box">
      <input type="radio" id="difficulty-easy" name="difficulty" value="1" class="set__difficulty-input">
      <label for="difficulty-easy" class="set__level">1</label>

      <input type="radio" id="difficulty-medium" name="difficulty" value="2" class="set__difficulty-input">
      <label for="difficulty-medium" class="set__level">2</label>

      <input type="radio" id="difficulty-hard" name="difficulty" value="3" class="set__difficulty-input">
      <label for="difficulty-hard" class="set__level">3</label>
    </div>
    <button type="submit" class="button" id="button">Старт</button>
  </form>
  </div>`;
  appEl.innerHTML = appHtml;
}

function createCardsShirts(difficulty) {
  let cards = '';
  numberOfCards = difficulty*6;
  for (let i = 0; i < numberOfCards; i++) {
    cards = cards + '<img src="./card_shirt.png" alt="" class="cards__shirt"> ';
  }
  return cards;
}

function renderAppStartGame (difficulty) {
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
    ${createCardsShirts(difficulty)}
  </div>
</div>
  `;
  appEl.innerHTML = appHtml;
  appEl.addEventListener('click', (event) => {
    renderAppGame();
  })
}

ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6'];
suits = ['spades.svg', 'hearts.svg', 'diamonds.svg', 'clubs.svg']

function createCards() {
  let cards = '';
  for (let j = 0; j < suits.length; j++) {
    for (let i = 0; i < ranks.length; i++) {
      cards = cards + `<div class="card">
      <div class="card__name-container">
        <div class="card__name">
          <p class="card__rank">${ranks[i]}</p>
          <img src="./${suits[j]}" alt="" class="card__suit_small">
        </div>
      </div>
      <div class="card__suit">
        <img src="./${suits[j]}" alt="" class="card__suit_big">
      </div>
      <div class="card__name-container reverse">
        <div class="card__name">
          <p class="card__rank">${ranks[i]}</p>
          <img src="./${suits[j]}" alt="" class="card__suit_small">
        </div>
      </div>
    </div> 
    `;
    }
  }
  return cards;
}

function renderAppGame () {
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
    ${createCards()}
  </div>
</div>
  `;
  appEl.innerHTML = appHtml;
}

if (game.gameStatus === 'selection') {
  renderAppSelection ();
  let levels = document.querySelectorAll('input[type="radio"]');
  let setButton = document.querySelector('#button');

  setButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    for (let level of levels) {
      if (level.checked) {
        game.difficulty = level.value;
        game.gameStatus = game;
        renderAppStartGame(game.difficulty);
      }
    }
  })
}


// if (game.gameStatus === 'finish') {
//   renderAppFinish (result, time);
// }

