export function createCardDeck() {
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

export function createRandomCardDeck(numberOfCards: number) {
  const cardDeck = createCardDeck();
  const randomCards: string[] = [];
  const mixRandomCards: string[] = [];

  for (let i = 0; i < numberOfCards / 2; i++) {
    const randome: number = Math.floor(Math.random() * (36 - i));
    randomCards.push(cardDeck[randome]);
    randomCards.push(cardDeck[randome]);
    cardDeck.splice(randome, 1);
  }

  for (let i = 0; i < numberOfCards; i++) {
    const randome = Math.floor(Math.random() * (numberOfCards - i));
    mixRandomCards.push(randomCards[randome]);
    randomCards.splice(randome, 1);
  }

  return mixRandomCards;
}
