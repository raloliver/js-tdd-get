import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

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
    it('should have getAlbums method', () => {
      expect(getAlbums).to.exist;
    });
    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    //check fetch
    it('should call fetch method', () => {
      const album = getAlbum('41MnTivkwTO3UUJ8DrqEJJ');
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
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk');
    });

    it('should return the correct data from Promise', () => {
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
      albums.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });

  describe('getAlbumsTracks', () => {
    it('should call fetch method', () => {
      const tracks = getTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = getTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    it('should return the correct data from Promise', () => {
      const tracks = getTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(tracks.resolveValue).to.be.eql({ album: 'name' });
    });
  });
});
