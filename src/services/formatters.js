import { DISTANCE_UNIT_ABBREVIATIONS } from './converters';
import symbols from './symbols';

const formatSurgeMultiplier = surgeMultiplier => (
  surgeMultiplier > 1
    ? `${surgeMultiplier}x ${symbols.SURGE_EXISTS}`
    : symbols.NOT_APPLICABLE
);

const formatDistance = ({ value, unit }) => {
  // 2 decimal places
  const roundedDistanceValue = Math.round(value * 100) / 100;
  return `${roundedDistanceValue} ${DISTANCE_UNIT_ABBREVIATIONS[unit]}.`;
};

const formatPrice = ({ price, currencyCode }) => (
  Intl.NumberFormat('en-US', {
    style: 'currency',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    currency: currencyCode,
  }).format(price)
);

const formatPriceRange = ({ low, high, currencyCode }) => `${formatPrice({ price: low, currencyCode })}-${formatPrice({ price: high, currencyCode })}`;

const formatSeconds = (seconds) => {
  let value = seconds;

  if (value < 0) {
    throw new RangeError('Cannot generate formatted time for negative seconds');
  }

  if (value === 0) {
    return '0 sec.';
  }

  const days = Math.floor(value / 86400);
  value %= 86400;

  const hours = Math.floor(value / 3600);
  value %= 3600;

  const minutes = Math.floor(value / 60);
  value %= 60;

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

  if (value !== 0) {
    formattedTime += ` ${value} sec.`;
  }

  // GAWD THIS IS SO FUCKING HACKY I HATE EVERYTHING
  return formattedTime.trim();
};

export {
  formatSurgeMultiplier,
  formatDistance,
  formatPriceRange,
  formatSeconds,
};
