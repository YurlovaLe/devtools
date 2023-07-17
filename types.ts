export type Game = {
  difficulty: number;
  time: string;
  isWin: boolean;
  cards: string[];
  chosenCards: number[];
  numberOfFindePair: number;
  timerId: number;
};

export type OnCardClick = {
  cards: NodeListOf<HTMLDivElement>;
  index: number;
};

export type RenderAppSelection = {
  appEl: HTMLDivElement;
  chooseLevel: (level: number) => void;
};

export type RenderAppGame = {
  appEl: HTMLDivElement;
  startGame: () => void;
  game: Game;
};

export type RenderAppStartGame = {
  appEl: HTMLDivElement;
  startGame: () => void;
  game: Game;
  onCardClick: (Object: OnCardClick) => void;
};

export type RenderAppFinish = {
  startGame: () => void;
  game: Game;
  result: boolean;
  popup: HTMLDivElement;
};
