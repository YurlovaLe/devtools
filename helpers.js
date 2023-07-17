export function StartTimer({ game }) {
  let timeStart = new Date();
  function updateTime() {
    let timer = document.querySelector('.time__timer');
    let time = new Date() - timeStart;
    let min = '';
    let sec = '';

    if (Math.floor(time / 60000) < 10) {
      min = '0' + Math.floor(time / 60000);
    } else {
      min = Math.floor(time / 60000);
    }

    if (Math.floor(time / 1000 - min * 60) < 10) {
      sec = '0' + Math.floor(time / 1000 - min * 60);
    } else {
      sec = Math.floor(time / 1000 - min * 60);
    }

    game.time = min + '.' + sec;
    timer.innerHTML = game.time;
  }

  game.timerId = setInterval(updateTime, 1000);
  updateTime();
}
