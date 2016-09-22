import chai, { expect } from 'chai';
import configureStore from '../store';


describe('configureStore', () => {
  let store;

  before(() => {
    store = configureStore();
  });

  describe('We have a workable store', () => {
    it('store should be an object', () => {
      expect(typeof store).to.equal('object');
    });
  });
});
