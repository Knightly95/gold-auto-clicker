import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../gold-footer.js';

describe('Gold Footer', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<gold-footer></gold-footer>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
