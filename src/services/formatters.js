import DistanceUnit from '../data/DistanceUnit';
import TimeUnit from '../data/TimeUnit';
import {
  DISTANCE_UNIT_ABBREVIATIONS,
  convertDuration,
  convertDistance,
} from './converters';
import symbols from './symbols';

const formatSurgeMultiplier = (surgeMultiplier) => (
  surgeMultiplier > 1 ?
    `${surgeMultiplier}x ${symbols.SURGE_EXISTS}` :
    symbols.NOT_APPLICABLE
);

const formatDistance = ({ distance, presentationUnits }) => {
  // 2 decimal places
  const convertedDistance = convertDistance({ distance, toUnit: presentationUnits });
  const roundedDistanceValue = Math.round(convertedDistance.value * 100) / 100;
  return `${roundedDistanceValue} ${DISTANCE_UNIT_ABBREVIATIONS[convertedDistance.unit]}.`;
}

const formatPrice = ({ price, currencyCode }) => (
  Intl.NumberFormat('en-US', {
    style: 'currency',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    currency: currencyCode,
  }).format(price)
)

const formatPriceRange = ({ low, high, currencyCode }) => `${formatPrice({ price: low, currencyCode })}-${formatPrice({ price: high, currencyCode })}`;

const formatDuration = duration => {
  const convertedDuration = convertDuration({ duration, toUnit: TimeUnit.SECOND });
  let seconds = convertedDuration.length;

  if (seconds < 0) {
    throw new RangeError('Cannot generate formatted time for negative seconds');
  }

  if (seconds === 0) {
    return '0 sec.';
  }

  const days = Math.floor(seconds / 86400);
  seconds %= 86400;

  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  let formattedTime = '';
  if (days !== 0) {
    formattedTime += ` ${days} days`;
  }

  if (hours !== 0) {
    formattedTime += ` ${hours} hrs.`;
  }

  if (minutes !== 0) {
    formattedTime += ` ${minutes} min.`;
  }

  if (seconds !== 0) {
    formattedTime += ` ${seconds} sec.`;
  }

  // GAWD THIS IS SO FUCKING HACKY I HATE EVERYTHING
  return formattedTime.trim();
};

export {
  formatSurgeMultiplier,
  formatDistance,
  formatPriceRange,
  formatDuration,
};
