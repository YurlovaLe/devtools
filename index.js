import './style.css';

const game = {
  difficulty: undefined,
  time: 0,
  gameStatus: 'selection',
  cards: [],
  chosenCards: [],
};
const appEl = document.getElementById('app');

function renderAppSelection() {
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

function createCardsShirts(numberOfCards) {
  let cards = '';
  for (let i = 0; i < numberOfCards; i++) {
    cards =
      cards +
      '<div class="cards__shirt"> <img src="./static/card_shirt.png" alt="" class="cards__shirt_img"> </div>';
  }
  return cards;
}

function renderAppStartGame(numberOfCards) {
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
    ${createCardsShirts(numberOfCards)}
  </div>
</div>
  `;
  appEl.innerHTML = appHtml;
  let cards = document.querySelectorAll('.cards__shirt');
  console.log(cards);
  for (let i = 0; i < numberOfCards; i++) {
    cards[i].addEventListener('click', () => {
      if (game.chosenCards.includes(i)) {
        return;
      }
      if (game.chosenCards.length < 2) {
        let card = game.cards[i].split(' ');
        game.chosenCards.push(i);
        console.log(game.chosenCards);
        cards[i].innerHTML = `<div class="card__name-container">
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
      if (game.chosenCards.length === 2) {
        alert(
          game.cards[game.chosenCards[0]] === game.cards[game.chosenCards[1]]
            ? 'Вы победили'
            : 'Вы проиграли',
        );
      }
    });
  }
}

const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6'];
const suits = [
  './static/spades.svg',
  './static/hearts.svg',
  './static/diamonds.svg',
  './static/clubs.svg',
];

function createCardDeck() {
  let cards = [];
  for (let j = 0; j < suits.length; j++) {
    for (let i = 0; i < ranks.length; i++) {
      cards.push(ranks[i] + ' ' + suits[j]);
    }
  }
  return cards;
}

function createCards(numberOfCards) {
  let cards = '';
  let cardDeck = createCardDeck();
  let randomCards = [];

  for (let i = 0; i < numberOfCards / 2; i++) {
    let randome = Math.floor(Math.random() * (36 - i));
    randomCards.push(cardDeck[randome]);
    randomCards.push(cardDeck[randome]);
    cardDeck.splice(randome, 1);
  }

  for (let i = 0; i < numberOfCards; i++) {
    let randome = Math.floor(Math.random() * (numberOfCards - i));
    game.cards.push(randomCards[randome]);
    randomCards.splice(randome, 1);
  }
  console.log(game.cards);

  for (let i = 0; i < numberOfCards; i++) {
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

function renderAppGame(numberOfCards) {
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
    ${createCards(numberOfCards)}
  </div>
</div>
  `;
  appEl.innerHTML = appHtml;
}

if (game.gameStatus === 'selection') {
  renderAppSelection();
  let levels = document.querySelectorAll('input[type="radio"]');
  let setButton = document.querySelector('#button');

  setButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    for (let level of levels) {
      if (level.checked) {
        game.difficulty = level.value;
        game.gameStatus = game;
        let numberOfCards = game.difficulty * 6;
        renderAppGame(numberOfCards);
        setTimeout(renderAppStartGame, 5000, numberOfCards);
      }
    }
  });
}

// if (game.gameStatus === 'finish') {
//   renderAppFinish (result, time);
// }
