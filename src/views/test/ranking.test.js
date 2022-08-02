import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../ranking.js';

describe('ranking View tests', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<ranking-view></ranking-view>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
