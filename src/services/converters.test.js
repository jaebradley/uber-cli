import convert, { to, from } from 'convert-units';
import TimeUnit from '../data/TimeUnit';
import DistanceUnit from '../data/DistanceUnit';

import {
  convertDuration,
  convertDistance,
} from './converters';

jest.mock('convert-units');

describe('converters', () => {
  describe('#convertDuration', () => {
    it('converts from seconds to minutes', () => {
      const { length, unit } = convertDuration({
        duration: {
          length: 1,
          unit: TimeUnit.SECOND,
        },
        toUnit: TimeUnit.MINUTE,
      });
      expect(convert).toHaveBeenCalledWith(1);
      expect(from).toHaveBeenCalledWith('s');
      expect(to).toHaveBeenCalledWith('min');
      expect(length).toEqual(1234);
      expect(unit).toEqual(TimeUnit.MINUTE);
    });
  });

  describe('#convertDistance', () => {
    it('converts from miles to kilometers', () => {
      const { value, unit } = convertDistance({
        distance: {
          value: 1,
          unit: DistanceUnit.MILE,
        },
        toUnit: DistanceUnit.KILOMETER,
      });
      expect(convert).toHaveBeenCalledWith(1);
      expect(from).toHaveBeenCalledWith('mi');
      expect(to).toHaveBeenCalledWith('km');
      expect(value).toEqual(1234);
      expect(unit).toEqual(DistanceUnit.KILOMETER);
    });
  });
});
