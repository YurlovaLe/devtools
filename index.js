const game = {
  difficulty: undefined,
  time: 0,
  gameStatus: 'selection',
  cards: [],
  chosenCards: [],
}
const appEl = document.getElementById("app");

function renderAppSelection () {
  const appHtml = `<form class="set">
    <h1 class="set__heading">Выбери</br>сложность</h1>
    <div class="set__level-box">
      <input type="radio" id="difficulty-easy" name="difficulty" value="1" class="set__difficulty-input">
      <label for="difficulty-easy" class="set__level">1</label>

      <input type="radio" id="difficulty-medium" name="difficulty" value="2" class="set__difficulty-input">
      <label for="difficulty-medium" class="set__level">2</label>

      <input type="radio" id="difficulty-hard" name="difficulty" value="3" class="set__difficulty-input">
      <label for="difficulty-hard" class="set__level">3</label>
    </div>
    <button type="submit" class="set__button" id="button">Старт</button>
  </form>
  `;
  appEl.innerHTML = appHtml;
}

function renderAppGame (difficulty) {
  const appHtml = `<h1>Игра. Cложность ${difficulty}</h1>`;
  appEl.innerHTML = appHtml;
}

if (game.gameStatus === 'selection') {
  renderAppSelection ();
  let levels = document.querySelectorAll('input[type="radio"]');
  let setButton = document.querySelector('#button');

  setButton.addEventListener('click', (event) => {
    event.preventDefault();
    for (let level of levels) {
      if (level.checked) {
        game.difficulty = level.value;
        game.gameStatus = game;
        renderAppGame(game.difficulty);
      }
    }
  })
}


// if (game.gameStatus === 'finish') {
//   renderAppFinish (result, time);
// }

