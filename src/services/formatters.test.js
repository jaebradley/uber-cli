import {
  formatSeconds, formatSurgeMultiplier, formatDistance, formatPriceRange,
} from './formatters';
import DistanceUnit from '../data/DistanceUnit';
import symbols from './symbols';

jest.mock('./symbols', () => ({
  SURGE_EXISTS: 'surge exists',
  NOT_APPLICABLE: 'not applicable',
}));

describe('formatters', () => {
  describe('#formatSurgeMultiplier', () => {
    it('returns formatted surge multiplier when multiplier is 2', () => {
      expect(formatSurgeMultiplier(2)).toEqual(`2x ${symbols.SURGE_EXISTS}`);
    });

    it('does not format surge multiplier when multiplier is 1', () => {
      expect(formatSurgeMultiplier(1)).toEqual(symbols.NOT_APPLICABLE);
    });

    it('does not format surge multiplier when multiplier is null', () => {
      expect(formatSurgeMultiplier(null)).toEqual(symbols.NOT_APPLICABLE);
    });
  });

  describe('#formatDistance', () => {
    it('returns 12 mi. for a value of 12', () => {
      expect(formatDistance({ value: 12, unit: DistanceUnit.MILE })).toEqual('12 mi.');
    });

    it('returns 12.35 mi. for a value of 12.345', () => {
      expect(formatDistance({ value: 12.345, unit: DistanceUnit.MILE })).toEqual('12.35 mi.');
    });
  });

  describe('#formatPriceRange', () => {
    it('returns $1-$2 when low is 1, high is 2, and currencyCode is USD', () => {
      expect(formatPriceRange({ low: 1, high: 2, currencyCode: 'USD' }));
    });

    it('returns $1-$2 when low is 1.23 and high is 2.34 and currencyCode is USD', () => {
      expect(formatPriceRange({ low: 1.23, high: 2.34, currencyCode: 'USD' }));
    });
  });

  describe('#formatSeconds', () => {
    it('throws RangeError when negative duration', () => {
      expect(() => formatSeconds(-1)).toThrow(RangeError);
    });

    it('returns 0 sec.', () => {
      expect(formatSeconds(0)).toEqual('0 sec.');
    });

    it('returns 59 sec.', () => {
      expect(formatSeconds(59)).toEqual('59 sec.');
    });

    it('returns 1 min.', () => {
      expect(formatSeconds(60)).toEqual('1 min.');
    });

    it('returns 1 min. 1 sec.', () => {
      expect(formatSeconds(61)).toEqual('1 min. 1 sec.');
    });

    it('returns 59 min. 59 sec.', () => {
      expect(formatSeconds(3599)).toEqual('59 min. 59 sec.');
    });

    it('returns an hour', () => {
      expect(formatSeconds(3600)).toEqual('1 hrs.');
    });

    it('returns 23 hrs. 59 min. 59 sec.', () => {
      expect(formatSeconds(86399)).toEqual('23 hrs. 59 min. 59 sec.');
    });

    it('returns 1 days', () => {
      expect(formatSeconds(86400)).toEqual('1 days');
    });
  });
});
