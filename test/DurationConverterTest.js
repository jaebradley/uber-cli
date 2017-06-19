import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import { Map } from 'immutable';

import Duration from '../src/data/Duration';
import TimeUnit from '../src/data/TimeUnit';

import DurationConverter from '../src/services/DurationConverter';

chai.use(chaiImmutable);

const expect = chai.expect;

describe('Duration converter', () => {
  const converter = new DurationConverter();
  const length = 60;
  const durationInSeconds = new Duration({
    length,
    unit: TimeUnit.SECOND,
  });

  it('validates construction', () => {
    const expected = {};
    expected[TimeUnit.SECOND.name] = 's';
    expected[TimeUnit.MINUTE.name] = 'min';
    expect(converter.durationUnitAbbreviations).to.eql(Map(expected));
  });

  describe('unit identification', () => {
    it('successfully', () => {
      expect(converter.getUnitConversionIdentifier(TimeUnit.SECOND)).to.equal('s');
    });

    it('throws for unknown unit', () => {
      expect(() => converter.getUnitConversionIdentifier('foo')).to.throw(TypeError);
    });
  });

  describe('conversion', () => {
    it('converts', () => {
      expect(converter.convert(durationInSeconds, TimeUnit.SECOND)).to.eql(durationInSeconds);
    });
  });
});
