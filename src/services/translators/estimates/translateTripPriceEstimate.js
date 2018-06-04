import DistanceUnit from '../../../data/DistanceUnit';
import TimeUnit from '../../../data/TimeUnit';

const translateTripPriceEstimate = estimate => ({
  productName: estimate['localized_display_name'],
  distance: {
    value: estimate.distance,
    unit: DistanceUnit.MILE,
  },
  duration: {
    length: estimate.duration,
    unit: TimeUnit.SECOND,
  },
  range: {
    high: estimate['high_estimate'],
    low: estimate['low_estimate'],
    currencyCode: estimate['currency_code'],
  },
  surgeMultiplier: estimate.surgeMultiplier ? estimate.surgeMultiplier : null,
});

export default translateTripPriceEstimate;
