import { expect } from 'chai';

import Utilities from '../../src/services/Utilities';

describe('Tests Utilities', () => {
  it('tests is float', () => {
    expect(Utilities.isFloat('jae')).to.be.false;
    expect(Utilities.isFloat(undefined)).to.be.false;
    expect(Utilities.isFloat(null)).to.be.false;
    expect(Utilities.isFloat([])).to.be.false;
    expect(Utilities.isFloat(1)).to.be.false;
    expect(Utilities.isFloat(-1.2345)).to.be.true;
  });
});
