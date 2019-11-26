import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { getAlbum, getAlbumTracks } from '../src/album';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album', () => {
  let fetchStub;
  let promise;

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
    promise = fetchStub.resolves({ json: () => { album: 'Dirty Loops' } });
  });

  afterEach(() => {
    //return test to original state
    fetchStub.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });
    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    //check fetch
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(fetchStub).to.have.been.calledOnce;
    });
    //check fetch on url
    it('should call fetch url', () => {
      const album = getAlbum('41MnTivkwTO3UUJ8DrqEJJ');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=41MnTivkwTO3UUJ8DrqEJJ');
    });
    //check fetch with promise
    it('should return data', () => {
      const album = getAlbum('41MnTivkwTO3UUJ8DrqEJJ');
      expect(album.resolveValue).to.be.eql({ album: 'Dirty Loops' });
    });
  });
});
