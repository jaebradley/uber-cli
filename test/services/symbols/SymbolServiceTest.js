import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { List } from 'immutable';

import EmojiService from '../../../src/services/symbols/EmojiService';
import TextSymbolService from '../../../src/services/symbols/TextSymbolService';
import SymbolService from '../../../src/services/symbols/SymbolService';

chai.use(chaiImmutable);
chai.use(sinonChai);

const expect = chai.expect;

describe('SymbolService Test', () => {
  let originalPlatform;
  let sandbox;

  let service = new SymbolService();

  describe('#getEmojiSupportedOperatingSystems', () => {
    it('should return operated systems that support emojis', () => {
      expect(SymbolService.getEmojiSupportedOperatingSystems()).to.eql(List.of('darwin'));
    });
  });

  describe('#areEmojisSupported', () => {
    before(() => {
      originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform');

      Object.defineProperty(process, 'platform', {
        value: 'any-platform',
      });
    });

    after(() => {
      Object.defineProperty(process, 'platform', originalPlatform);
    });

    it('should return if emojis are supported', () => {
      expect(SymbolService.areEmojisSupported()).to.eql(false);
    });
  });

  describe('#constructor', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    describe('when emojis are supported', () => {
      it('client should be emoji service', () => {
        sandbox.stub(SymbolService, 'areEmojisSupported').returns(true);
        service = new SymbolService();
        return expect(service.client instanceof EmojiService).to.be.true;
      });
    });

    describe('when emojis are not supported', () => {
      it('client should be text service', () => {
        sandbox.stub(SymbolService, 'areEmojisSupported').returns(false);
        service = new SymbolService();
        return expect(service.client instanceof TextSymbolService).to.be.true;
      });
    });
  });

  describe('#getVehicleSymbol', () => {
    it('should forward to client method', () => {
      const clientSpy = sinon.spy(service.client, 'getVehicleSymbol');
      service.getVehicleSymbol();
      return expect(clientSpy.calledOnce).to.be.true;
    });
  });

  describe('#getPriceSymbol', () => {
    it('should forward to client method', () => {
      const clientSpy = sinon.spy(service.client, 'getPriceSymbol');
      service.getPriceSymbol();
      return expect(clientSpy.calledOnce).to.be.true;
    });
  });

  describe('#getTripDistanceSymbol', () => {
    it('should forward to client method', () => {
      const clientSpy = sinon.spy(service.client, 'getTripDistanceSymbol');
      service.getTripDistanceSymbol();
      return expect(clientSpy.calledOnce).to.be.true;
    });
  });

  describe('#getDurationSymbol', () => {
    it('should forward to client method', () => {
      const clientSpy = sinon.spy(service.client, 'getDurationSymbol');
      service.getDurationSymbol();
      return expect(clientSpy.calledOnce).to.be.true;
    });
  });

  describe('#getSurgeSymbol', () => {
    it('should forward to client method', () => {
      const clientSpy = sinon.spy(service.client, 'getSurgeSymbol');
      service.getSurgeSymbol();
      return expect(clientSpy.calledOnce).to.be.true;
    });
  });

  describe('#getNotApplicableSymbol', () => {
    it('should forward to client method', () => {
      const clientSpy = sinon.spy(service.client, 'getNotApplicableSymbol');
      service.getNotApplicableSymbol();
      return expect(clientSpy.calledOnce).to.be.true;
    });
  });

  describe('#getDestinationSymbol', () => {
    it('should forward to client method', () => {
      const clientSpy = sinon.spy(service.client, 'getDestinationSymbol');
      service.getDestinationSymbol();
      return expect(clientSpy.calledOnce).to.be.true;
    });
  });

  describe('#getOriginSymbol', () => {
    it('should forward to client method', () => {
      const clientSpy = sinon.spy(service.client, 'getOriginSymbol');
      service.getOriginSymbol();
      return expect(clientSpy.calledOnce).to.be.true;
    });
  });

  describe('#getMaximumDistanceSymbol', () => {
    it('should forward to client method', () => {
      const clientSpy = sinon.spy(service.client, 'getMaximumDistanceSymbol');
      service.getMaximumDistanceSymbol();
      return expect(clientSpy.calledOnce).to.be.true;
    });
  });
});
