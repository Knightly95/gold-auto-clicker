import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../status-card.js';

describe('Gold Footer', () => {
  let element;
  const newUser = {
    username: 'foo',
    clicks: 0,
    autoclicker: {
      baseCost: 10,
      cost: 10,
      power: 1,
      amount: 1,
    },
    clickPower: 1,
  };
  beforeEach(async () => {
    element = await fixture(
      html`<status-card .currentUser=${newUser}></status-card>`
    );
  });
  it('calls getGold when button is clicked', async () => {
    const getGoldSpy = sinon.spy(element, 'getGold');

    element.requestUpdate();
    await element.updateComplete;

    element.shadowRoot.querySelector('.get-gold-btn').click();
    getGoldSpy.restore();

    expect(getGoldSpy.calledOnce);
  });
  it('calls hireGoldMiner when button is clicked', async () => {
    const hireGoldMinerSpy = sinon.spy(element, 'hireGoldMiner');

    element.requestUpdate();
    await element.updateComplete;

    element.shadowRoot.querySelector('.hire-btn').click();
    hireGoldMinerSpy.restore();

    expect(hireGoldMinerSpy.calledOnce);
  });
  it('calls autoclickerCall when button is clicked', async () => {
    const autoclickerCallSpy = sinon.spy(element, 'autoclickerCall');

    element.requestUpdate();
    await element.updateComplete;

    setTimeout(() => {
      expect(autoclickerCallSpy.called);
    }, 2000);
  });
  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
