import DistanceUnit from '../../data/DistanceUnit';
import {
  convertDistance,
  DISTANCE_UNIT_ABBREVIATIONS,
} from '../converters';
import formatDuration from '../formatDuration';
import symbols from '../symbols';

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

const formatTripPriceEstimateRow = ({ estimate, presentationUnits }) => {
  const {
    productName,
    range,
    distance,
    duration,
    surgeMultiplier
  } = estimate;
  return [
    productName,
    formatPriceRange(range),
    formatDistance({ distance, presentationUnits }),
    formatDuration(duration),
    formatSurgeMultiplier(surgeMultiplier),
  ];
}

export default formatTripPriceEstimateRow;
