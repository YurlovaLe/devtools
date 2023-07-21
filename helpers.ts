import type { Game } from './types';

type StartTimer = {
  game: Game;
};

export function StartTimer({ game }: StartTimer) {
  const timeStart = Number(new Date());
  function updateTime() {
    const timer = document.querySelector('.time__timer') as HTMLDivElement;
    const time = Number(new Date()) - timeStart;
    let min = '';
    let sec = '';

    if (Math.floor(time / 60000) < 10) {
      min = '0' + Math.floor(time / 60000);
    } else {
      min = String(Math.floor(time / 60000));
    }

    if (Math.floor(time / 1000 - Number(min) * 60) < 10) {
      sec = '0' + Math.floor(time / 1000 - Number(min) * 60);
    } else {
      sec = String(Math.floor(time / 1000 - Number(min) * 60));
    }

    game.time = min + '.' + sec;
    timer.innerHTML = game.time;
  }

  game.timerId = window.setInterval(updateTime, 1000);
  updateTime();
}
