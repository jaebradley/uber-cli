'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { List, Map } from 'immutable';
import emoji from 'node-emoji';

import DistanceUnit from '../../../src/data/DistanceUnit';

import DistanceConverter from '../../../src/services/DistanceConverter';
import DurationConverter from '../../../src/services/DurationConverter';
import DurationFormatter from '../../../src/services/DurationFormatter';
import TripPriceEstimateRowFormatter from '../../../src/services/tables/TripPriceEstimateRowFormatter';

chai.use(chaiImmutable);
chai.use(sinonChai);

const expect = chai.expect;

describe('Trip Price Estimate Row Formatter', () => {
  const distanceConverter = new DistanceConverter();
  const durationConverter = new DurationConverter();
  const durationFormatter = new DurationFormatter(durationConverter);
  const rowFormatter = new TripPriceEstimateRowFormatter(distanceConverter, durationFormatter);

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

  describe('format range', () => {
    const range = {
      currencyCode: 'USD',
      low: 'foo',
      high: 'bar',
    };

    it('successfully', () => {
      const expected = '$foo-$bar';
      expect(rowFormatter.formatRange(range)).to.eql(expected);
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
    it('for no surge multiplier', () => expect(rowFormatter.formatSurgeMultiplier(1)).to.eql(emoji.get('no_entry_sign')));

    it('for surge multiplier', () => {
      const expected = `1.1x ${emoji.get('grimacing')}`;
      expect(rowFormatter.formatSurgeMultiplier(1.1)).to.eql(expected);
    });
  });

  describe('format', () => {
    it('succeeds', () => {
      const expected = List.of('productName', 'foo', 'bar', 'baz', 'jaebaebae');

      expect(rowFormatter.format({ productName: 'productName' }, {}, {})).to.eql(expected);
    });
  });
});
