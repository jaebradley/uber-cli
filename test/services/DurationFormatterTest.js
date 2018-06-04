import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import TimeUnit from '../../src/data/TimeUnit';

import DurationConverter from '../../src/services/DurationConverter';
import DurationFormatter from '../../src/services/DurationFormatter';

chai.use(chaiImmutable);
chai.use(sinonChai);

const expect = chai.expect;

describe('Duration Formatter', () => {
  const converter = new DurationConverter();
  const formatter = new DurationFormatter(converter);

  describe('throws exception', () => {
    const negativeDuration = {
      length: -1,
      unit: TimeUnit.SECOND,
    };

    it('throws exception', () => {
      const durationConversion = sinon.stub(converter, 'convert').returns(negativeDuration);
      expect(() => formatter.format({})).to.throw(RangeError);
      durationConversion.restore();
    });
  });

  describe('0 seconds', () => {
    const zeroSeconds = {
      length: 0,
      unit: TimeUnit.SECOND,
    };

    it('returns 0 sec.', () => {
      const durationConversion = sinon.stub(converter, 'convert').returns(zeroSeconds);
      expect(formatter.format({})).to.eql('0 sec.');
      durationConversion.restore();
    });
  });

  describe('formats', () => {
    const underAMinute = {
      length: 59,
      unit: TimeUnit.SECOND,
    };
    it('under a minute', () => {
      const durationConversion = sinon.stub(converter, 'convert').returns(underAMinute);
      expect(formatter.format()).to.eql('59 sec.');
      durationConversion.restore();
    });

    const aMinute = {
      length: 60,
      unit: TimeUnit.SECOND,
    };
    it('a minute', () => {
      const durationConversion = sinon.stub(converter, 'convert').returns(aMinute);
      expect(formatter.format()).to.eql('1 min.');
      durationConversion.restore();
    });

    const overAMinute = {
      length: 61,
      unit: TimeUnit.SECOND,
    };
    it('over a minute', () => {
      const durationConversion = sinon.stub(converter, 'convert').returns(overAMinute);
      expect(formatter.format()).to.eql('1 min. 1 sec.');
      durationConversion.restore();
    });

    const underAnHour = {
      length: 3599,
      unit: TimeUnit.SECOND,
    };
    it('under an hour', () => {
      const durationConversion = sinon.stub(converter, 'convert').returns(underAnHour);
      expect(formatter.format()).to.eql('59 min. 59 sec.');
      durationConversion.restore();
    });

    const anHour = {
      length: 3600,
      unit: TimeUnit.SECOND,
    };
    it('an hour', () => {
      const durationConversion = sinon.stub(converter, 'convert').returns(anHour);
      expect(formatter.format()).to.eql('1 hrs.');
      durationConversion.restore();
    });

    const underADay = {
      length: 86399,
      unit: TimeUnit.SECOND,
    };
    it('under a day', () => {
      const durationConversion = sinon.stub(converter, 'convert').returns(underADay);
      expect(formatter.format()).to.eql('23 hrs. 59 min. 59 sec.');
      durationConversion.restore();
    });

    const aDay = {
      length: 86400,
      unit: TimeUnit.SECOND,
    };
    it('a day', () => {
      const durationConversion = sinon.stub(converter, 'convert').returns(aDay);
      expect(formatter.format()).to.eql('1 days');
      durationConversion.restore();
    });
  });
});
