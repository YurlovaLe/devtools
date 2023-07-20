import { test, expect } from '@jest/globals';
import { createCardDeck, createRandomCardDeck } from './deckHelpers';

test('create card deck', () => {
  expect(createCardDeck()).toHaveLength(36);
});

test('mixRandomCards length equal numberOfCards', () => {
  expect(createRandomCardDeck(12)).toHaveLength(12);
});

test('createCardDeck contains 9 spades', () => {
  expect(
    createCardDeck().filter((card) => {
      return card.includes('./static/spades.svg');
    }),
  ).toHaveLength(9);
});
