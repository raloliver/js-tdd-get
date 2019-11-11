import chai, { expect } from 'chai';

import sinon from 'sinon'; //work with promises
import sinonChai from 'sinon-chai'; //integrate sinon with chai 

chai.use(sinonChai); //use sinon chai interface

global.fetch = require('node-fetch'); //init global fetch (from browser)

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from './main';

describe('API Wrapper', () => {
  let fetchStub;
  let promise;

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
    promise = fetchStub.resolves({ json: () => { artist: 'Michael Jackson' } }); //check received data
  });

  afterEach(() => {
    //restore to make a test again
    fetchStub.restore();
  });
  describe('smoke tests', () => {

    //search: get generics and more than one type
    //searchAlbums
    //searchArtists
    //searchTracks
    //searchPlaylists

    it('should exist the `search` method', () => {
      expect(search).to.exist;
    });

    it('should exist the `searchAlbums` method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the `searchArtists` method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the `searchTracks` method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the `searchPlaylists` method', () => {
      expect(searchPlaylists).to.exist;
    });

  });

  //#TODO: resolveValue fixed
  describe('generic search', () => {

    it('should call fetch function', () => {
      const items = search();
      //call is not maked, just verify method with stub
      expect(fetchStub).to.have.been.calledOnce;
    });

    //check endpoint
    it('should receive correct endpoint to fetch', () => {

      context('one type', () => {
        const artists = search('Michael Jackson', 'artist');
        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=artist');

        const albums = search('Bad', 'album');
        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Bad&type=album');
      });

      context('one more type', () => {
        const artistsAndAlbums = search('Michael Jackson', ['artist', 'album']);
        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=artist,album');
      });
    });

    //check data values
    it('should return data from promise', () => {
      const artists = search('Michael Jackson', 'artist');

      //to deeply equal (eql())
      expect(artists.resolveValue).to.be.eql({ json: 'Michael Jackson' });
    });
  });

  describe('searchArtists', () => {
    it('should call fetch method', () => {
      const artists = searchArtists('Michael Jackson');
      expect(fetchStub).to.have.been.calledOnce;
    });
    it('should receive correct endpoint to fetch', () => {
      const artists = searchArtists('Michael Jackson');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch method', () => {
      const albums = searchAlbums('Michael Jackson');
      expect(fetchStub).to.have.been.calledOnce;
    });
    it('should receive correct endpoint to fetch', () => {
      const albums = searchAlbums('Michael Jackson');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch method', () => {
      const tracks = searchTracks('Michael Jackson');
      expect(fetchStub).to.have.been.calledOnce;
    });
    it('should receive correct endpoint to fetch', () => {
      const tracks = searchTracks('Michael Jackson');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=tracks');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch method', () => {
      const playlists = searchPlaylists('Michael Jackson');
      expect(fetchStub).to.have.been.calledOnce;
    });
    it('should receive correct endpoint to fetch', () => {
      const playlists = searchPlaylists('Michael Jackson');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=playlists');
    });
  });
});
