"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _sinon = _interopRequireDefault(require("sinon"));

var _sinonChai = _interopRequireDefault(require("sinon-chai"));

var _main = require("./main");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//work with promises
//integrate sinon with chai 
_chai.default.use(_sinonChai.default); //use sinon chai interface


global.fetch = require('node-fetch'); //init global fetch (from browser)

describe('API Wrapper', () => {
  let fetchStub;
  let promise;
  beforeEach(() => {
    fetchStub = _sinon.default.stub(global, 'fetch');
    promise = fetchStub.resolves({
      json: () => {
        artist: 'Michael Jackson';
      }
    }); //check received data
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
      (0, _chai.expect)(_main.search).to.exist;
    });
    it('should exist the `searchAlbums` method', () => {
      (0, _chai.expect)(_main.searchAlbums).to.exist;
    });
    it('should exist the `searchArtists` method', () => {
      (0, _chai.expect)(_main.searchArtists).to.exist;
    });
    it('should exist the `searchTracks` method', () => {
      (0, _chai.expect)(_main.searchTracks).to.exist;
    });
    it('should exist the `searchPlaylists` method', () => {
      (0, _chai.expect)(_main.searchPlaylists).to.exist;
    });
  }); //#TODO: resolveValue fixed

  describe('generic search', () => {
    it('should call fetch function', () => {
      const items = (0, _main.search)(); //call is not maked, just verify method with stub

      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    }); //check endpoint

    it('should receive correct endpoint to fetch', () => {
      context('one type', () => {
        const artists = (0, _main.search)('Michael Jackson', 'artist');
        (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=artist');
        const albums = (0, _main.search)('Bad', 'album');
        (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Bad&type=album');
      });
      context('one more type', () => {
        const artistsAndAlbums = (0, _main.search)('Michael Jackson', ['artist', 'album']);
        (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=artist,album');
      });
    }); //check data values

    it('should return data from promise', () => {
      const artists = (0, _main.search)('Michael Jackson', 'artist'); //to deeply equal (eql())

      (0, _chai.expect)(artists.resolveValue).to.be.eql({
        json: 'Michael Jackson'
      });
    });
  });
  describe('searchArtists', () => {
    it('should call fetch method', () => {
      const artists = (0, _main.searchArtists)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    });
    it('should receive correct endpoint to fetch', () => {
      const artists = (0, _main.searchArtists)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=artist');
    });
  });
  describe('searchAlbums', () => {
    it('should call fetch method', () => {
      const albums = (0, _main.searchAlbums)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    });
    it('should receive correct endpoint to fetch', () => {
      const albums = (0, _main.searchAlbums)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=album');
    });
  });
  describe('searchTracks', () => {
    it('should call fetch method', () => {
      const tracks = (0, _main.searchTracks)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    });
    it('should receive correct endpoint to fetch', () => {
      const tracks = (0, _main.searchTracks)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=tracks');
    });
  });
  describe('searchPlaylists', () => {
    it('should call fetch method', () => {
      const playlists = (0, _main.searchPlaylists)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    });
    it('should receive correct endpoint to fetch', () => {
      const playlists = (0, _main.searchPlaylists)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=playlists');
    });
  });
});