import chai from 'chai';

import Utilities from '../../src/services/Utilities';

const expect = chai.expect;

describe('Tests Utilities', () => {
  describe('#isFloat', () => {
    it('returns false for undefined', () => expect(Utilities.isFloat(undefined)).to.be.false);
    it('returns false for null', () => expect(Utilities.isFloat(undefined)).to.be.false);
    it('returns false for object', () => expect(Utilities.isFloat([])).to.be.false);
    it('returns false for integer', () => expect(Utilities.isFloat(1)).to.be.false);
    it('returns true for float', () => expect(Utilities.isFloat(-1.2345)).to.be.true);
  });
});
