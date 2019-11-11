import chai, { expect } from 'chai';

import sinon from 'sinon'; //work with promises
import sinonChai from 'sinon-chai'; //integrate sinon with chai 

chai.use(sinonChai); //use sinon chai interface

global.fetch = require('node-fetch'); //init global fetch (from browser)

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from './main';

describe('API Wrapper', () => {

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

  describe('generic search', () => {
    let fetchStub;

    beforeEach(() => {
      fetchStub = sinon.stub(global, 'fetch');
      fetchStub.resolves({ json: () => { } });
    });

    afterEach(() => {
      //restore to make a test again
      fetchStub.restore();
    });


    it('should call fetch function', () => {
      const items = search();
      //call is not maked, just verify method with stub
      expect(fetchStub).to.have.been.calledOnce;
    });

    //check endpoint
    it('should receive correct endpoint to fetch', () => {

      context('one type', () => {
        const artist = search('Michael Jackson', 'artist');
        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=artist');

        const albums = search('Bad', 'album');
        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Bad&type=album');
      });

      context('one more type', () => {
        const artistsAndAlbums = search('Michael Jackson', ['artist', 'album']);
        expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=artist,album');
      });
    });
  });
});
