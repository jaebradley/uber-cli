import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(chaiImmutable);
chai.use(sinonChai);

import { List } from 'immutable';

import EmojiService from '../../../src/services/symbols/EmojiService';
import TextSymbolService from '../../../src/services/symbols/TextSymbolService';
import SymbolService from '../../../src/services/symbols/SymbolService';

const expect = chai.expect;

describe('SymbolService Test', () => {
  describe('#getEmojiSupportedOperatingSystems', () => {
    it('should return operated systems that support emojis', () => {
      expect(SymbolService.getEmojiSupportedOperatingSystems()).to.eql(List.of('darwin'));
    });
  });

  describe('#areEmojisSupported', () => {
    before(function() {
      this.originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform');

      Object.defineProperty(process, 'platform', {
        value: 'any-platform'
      });
    });

    after(function() {
      Object.defineProperty(process, 'platform', this.originalPlatform);
    });

    it('should return if emojis are supported', () => {
      expect(SymbolService.areEmojisSupported()).to.eql(false);
    });
  });

  describe('#constructor', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    describe('when emojis are supported', () => {
      it('client should be emoji service', () => {
        sandbox.stub(SymbolService, 'areEmojisSupported').returns(true);
        const service = new SymbolService();
        expect(service.client instanceof EmojiService).to.be.true
      });
    });

    describe('when emojis are not supported', () => {
      it('client should be text service', () => {
        sandbox.stub(SymbolService, 'areEmojisSupported').returns(false);
        const service = new SymbolService();
        expect(service.client instanceof TextSymbolService).to.be.true;
      });
    });
  });
});
