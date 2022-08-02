import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../home.js';

describe('home View tests', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<home-view></home-view>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
