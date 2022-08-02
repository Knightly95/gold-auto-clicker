import { expect } from '@open-wc/testing';
import * as service from '../main.js';

describe('helper tests', () => {
  it('Should create in local storage the new user"', async () => {
    const newUser = {
      username: 'foo',
      clicks: 0,
      autoclicker: {
        baseCost: 10,
        cost: 10,
        power: 1,
        amount: 0,
      },
      clickPower: 1,
    };

    service.loginUser('foo');
    const savedUser = service.getUser({ username: 'foo' });

    expect(savedUser.username).to.equal(newUser.username);
  });
});
