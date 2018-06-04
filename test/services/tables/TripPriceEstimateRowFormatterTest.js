import DistanceUnit from '../../../src/data/DistanceUnit';

import DistanceConverter from '../../../src/services/DistanceConverter';
import DurationConverter from '../../../src/services/DurationConverter';
import DurationFormatter from '../../../src/services/DurationFormatter';
import TripPriceEstimateRowFormatter from '../../../src/services/tables/TripPriceEstimateRowFormatter';
import SymbolService from '../../../src/services/symbols/SymbolService';

describe('Trip Price Estimate Row Formatter', () => {
  let sandbox;

  const distanceConverter = new DistanceConverter();
  const durationConverter = new DurationConverter();
  const durationFormatter = new DurationFormatter(durationConverter);
  const symbolService = new SymbolService();
  const rowFormatter = new TripPriceEstimateRowFormatter(distanceConverter, durationFormatter, symbolService); // eslint-disable-line max-len

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('construction', () => {
    const abbreviations = {};
    abbreviations[DistanceUnit.MILE.name] = 'mi';
    abbreviations[DistanceUnit.KILOMETER.name] = 'km';
    const expected = Map(abbreviations);
    expect(rowFormatter.distanceUnitAbbreviations).to.eql(expected);
  });

  describe('fetches distance unit abbreviation', () => {
    it('succeeds', () => expect(rowFormatter.getDistanceUnitAbbreviation(DistanceUnit.MILE)).to.eql('mi'));

    it('throws exception', () => expect(() => rowFormatter.getDistanceUnitAbbreviation('foo')).to.throw(TypeError));
  });

  describe('#formatRange', () => {
    const range = {
      currencyCode: 'USD',
      low: 'foo',
      high: 'bar',
    };

    it('successfully', () => {
      sandbox.stub(rowFormatter, 'formatCurrencyValue').callsFake((value, currencyCode) => `${value}-${currencyCode}`);
      const expected = 'foo-USD-bar-USD';
      expect(rowFormatter.formatRange(range)).to.eql(expected);
    });
  });

  describe('#formatCurrencyValue', () => {
    it('succeeds', () => {
      expect(rowFormatter.formatCurrencyValue(1234.567, 'USD')).to.eql('$1,235');
    });
  });

  describe('format distance', () => {
    it('succeeds', () => {
      const distanceConversion = sinon.stub(distanceConverter, 'convert').returns({ value: 1 });
      const distanceUnitAbbreviation = sinon.stub(rowFormatter, 'getDistanceUnitAbbreviation').returns('bar');
      const expected = '1 bar.';

      expect(rowFormatter.formatDistance({})).to.eql(expected);

      distanceConversion.restore();
      distanceUnitAbbreviation.restore();
    });
  });

  describe('format surge multiplier', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('for no surge multiplier', () => {
      const notApplicableSymbol = 'not applicable symbol';
      sandbox.stub(rowFormatter.symbolService, 'getNotApplicableSymbol').returns(notApplicableSymbol);
      expect(rowFormatter.formatSurgeMultiplier(1)).to.eql(notApplicableSymbol);
    });

    it('for surge multiplier', () => {
      const surgePresentSymbol = 'surge present symbol';
      sandbox.stub(rowFormatter.symbolService, 'getSurgePresentSymbol').returns(surgePresentSymbol);
      const expected = `1.1x ${surgePresentSymbol}`;
      expect(rowFormatter.formatSurgeMultiplier(1.1)).to.eql(expected);
    });
  });

  describe('format', () => {
    it('succeeds', () => {
      const formattedRange = 'formatted range';
      const formattedDistance = 'formatted distance';
      const formattedDuration = 'formatted duration';
      const formattedSurgeMultiplier = 'formatted surge multiplier';
      sandbox.stub(rowFormatter, 'formatRange').returns(formattedRange);
      sandbox.stub(rowFormatter, 'formatDistance').returns(formattedDistance);
      sandbox.stub(rowFormatter.durationFormatter, 'format').returns(formattedDuration);
      sandbox.stub(rowFormatter, 'formatSurgeMultiplier').returns(formattedSurgeMultiplier);
      const expected = List.of('productName', formattedRange, formattedDistance, formattedDuration, formattedSurgeMultiplier);

      expect(rowFormatter.format({ productName: 'productName' }, {})).to.eql(expected);
    });
  });
});
