import DistanceUnit from '../data/DistanceUnit';
import {
  DISTANCE_UNIT_ABBREVIATIONS,
} from './converters';
import symbols from './symbols';
import { convertDistance } from './converters';

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

export {
  formatSurgeMultiplier,
  formatDistance,
  formatPriceRange,
};
