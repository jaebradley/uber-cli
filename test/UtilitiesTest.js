'use es6';

import {expect} from 'chai';

import Utilities from '../src/Utilities';

describe('Tests Utilities', function() {
  it('tests is float', function() {
    expect(Utilities.isFloat('jae')).to.be.false;
    expect(Utilities.isFloat(undefined)).to.be.false;
    expect(Utilities.isFloat(null)).to.be.false;
    expect(Utilities.isFloat([])).to.be.false;
    expect(Utilities.isFloat(1)).to.be.false;
    expect(Utilities.isFloat(-1.2345)).to.be.true;
  });

  it('tests formatted time', function() {
    expect(() => Utilities.generateFormattedTime(-1)).to.throw(RangeError);
    expect(Utilities.generateFormattedTime(0)).to.equal('0 sec.');
    expect(Utilities.generateFormattedTime(59)).to.equal('59 sec.');
    expect(Utilities.generateFormattedTime(60)).to.equal('1 min.');
    expect(Utilities.generateFormattedTime(61)).to.equal('1 min. 1 sec.');
    expect(Utilities.generateFormattedTime(3599)).to.equal('59 min. 59 sec.');
    expect(Utilities.generateFormattedTime(3600)).to.equal('1 hrs.');
    expect(Utilities.generateFormattedTime(86399)).to.equal('23 hrs. 59 min. 59 sec.');
    expect(Utilities.generateFormattedTime(86400)).to.equal('1 days');
  });
});
