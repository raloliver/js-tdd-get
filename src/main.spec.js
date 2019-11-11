import chai, { expect } from 'chai';

import sinon from 'sinon'; //work with promises
import sinonChai from 'sinon-chai'; //integrate sinon with chai 
import sinonStubPromise from 'sinon-stub-promise'; //work with promise

chai.use(sinonChai); //use sinon chai interface
sinonStubPromise(sinon); //test indeed 

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
    it('should call fetch function', () => {
      const fetchStub = sinon.stub(global, 'fetch');
      const items = search();

      expect(fetchStub).to.have.been.calledOnce;
    });
  });
});
