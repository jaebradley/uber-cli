import convert from 'convert-units';
import TimeUnit from '../data/TimeUnit';
import DistanceUnit from '../data/DistanceUnit';

const DURATION_UNIT_ABBREVIATIONS = Object.freeze({
  [TimeUnit.SECOND]: 's',
  [TimeUnit.MINUTE]: 'min',
});

const DISTANCE_UNIT_ABBREVIATIONS = Object.freeze({
  [DistanceUnit.MILE]: 'mi',
  [DistanceUnit.KILOMETER]: 'km',
});

const convertDuration = ({ duration, toUnit }) => ({
  length: convert(duration.length)
    .from(DURATION_UNIT_ABBREVIATIONS[duration.unit])
    .to(DURATION_UNIT_ABBREVIATIONS[toUnit]),
  unit: toUnit,
});

const convertDistance = ({ distance, toUnit }) => ({
  value: (convert(distance.value)
    .from(DISTANCE_UNIT_ABBREVIATIONS[distance.unit])
    .to(DISTANCE_UNIT_ABBREVIATIONS[toUnit])),
  unit: toUnit,
});

export {
  convertDuration,
  convertDistance,
  DISTANCE_UNIT_ABBREVIATIONS,
};
