import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../game.js';

describe('Game View tests', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<game-view></game-view>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
