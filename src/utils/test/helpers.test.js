import { expect } from '@open-wc/testing';
import { capitalize } from '../helpers.js';

describe('helper tests', () => {
  it('should Capitalizes "foo bar" to "Foo Bar"', async () => {
    expect(capitalize('foo bar')).to.equal('Foo Bar');
  });
});
