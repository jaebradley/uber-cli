import TimeUnit from '../../../data/TimeUnit';

const translatePickupTimeEstimate = estimate => ({
  productName: estimate['localized_display_name'],
  estimatedDuration: {
    length: estimate.estimate,
    unit: TimeUnit.SECOND,
  },
});

export default translatePickupTimeEstimate;
