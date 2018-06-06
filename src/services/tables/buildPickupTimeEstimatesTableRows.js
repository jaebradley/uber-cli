import formatDuration from '../formatDuration';

const buildPickupTimeEstimatesTableRows = estimates => {
  estimates.sort((firstEstimate, secondEstimate) => (firstEstimate.estimatedDuration.length - secondEstimate.estimatedDuration.length));
  const groupedEstimates = groupEstimatesByTime(estimates);
  return Object.keys(groupedEstimates).map(key => [ key, groupedEstimates[key].join(', ') ]);
};

const groupEstimatesByTime = estimates => {
  const rows = {};

  estimates.forEach(({ estimatedDuration, productName }) => {
    const formattedDuration = formatDuration(estimatedDuration);
    let productsWithSameDuration = rows[formattedDuration];

    if (!productsWithSameDuration) {
      productsWithSameDuration = [];
    }

    productsWithSameDuration.push(productName);
    rows[formattedDuration] = productsWithSameDuration;
  });

  return rows;
};

export default buildPickupTimeEstimatesTableRows;
