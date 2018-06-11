import { formatSeconds } from './formatters';

describe('formatters', () => {
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
