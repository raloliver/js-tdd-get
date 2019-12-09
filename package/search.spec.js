'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

var _main = require('./main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//integrate sinon with chai 

_chai2.default.use(_sinonChai2.default); //use sinon chai interface

//work with promises
global.fetch = require('node-fetch'); //init global fetch (from browser)

describe('API Wrapper', function () {
  var fetchStub = void 0;
  var promise = void 0;

  beforeEach(function () {
    fetchStub = _sinon2.default.stub(global, 'fetch');
    promise = fetchStub.resolves({ json: function json() {
        artist: 'Michael Jackson';
      } }); //check received data
  });

  afterEach(function () {
    //restore to make a test again
    fetchStub.restore();
  });
  describe('smoke tests', function () {

    //search: get generics and more than one type
    //searchAlbums
    //searchArtists
    //searchTracks
    //searchPlaylists

    it('should exist the `search` method', function () {
      (0, _chai.expect)(_main.search).to.exist;
    });

    it('should exist the `searchAlbums` method', function () {
      (0, _chai.expect)(_main.searchAlbums).to.exist;
    });

    it('should exist the `searchArtists` method', function () {
      (0, _chai.expect)(_main.searchArtists).to.exist;
    });

    it('should exist the `searchTracks` method', function () {
      (0, _chai.expect)(_main.searchTracks).to.exist;
    });

    it('should exist the `searchPlaylists` method', function () {
      (0, _chai.expect)(_main.searchPlaylists).to.exist;
    });
  });

  //#TODO: resolveValue fixed
  describe('generic search', function () {

    it('should call fetch function', function () {
      var items = (0, _main.search)();
      //call is not maked, just verify method with stub
      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    });

    //check endpoint
    it('should receive correct endpoint to fetch', function () {

      context('one type', function () {
        var artists = (0, _main.search)('Michael Jackson', 'artist');
        (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=artist');

        var albums = (0, _main.search)('Bad', 'album');
        (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Bad&type=album');
      });

      context('one more type', function () {
        var artistsAndAlbums = (0, _main.search)('Michael Jackson', ['artist', 'album']);
        (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=artist,album');
      });
    });

    //check data values
    it('should return data from promise', function () {
      var artists = (0, _main.search)('Michael Jackson', 'artist');

      //to deeply equal (eql())
      (0, _chai.expect)(artists.resolveValue).to.be.eql({ json: 'Michael Jackson' });
    });
  });

  describe('searchArtists', function () {
    it('should call fetch method', function () {
      var artists = (0, _main.searchArtists)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    });
    it('should receive correct endpoint to fetch', function () {
      var artists = (0, _main.searchArtists)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=artist');
    });
  });

  describe('searchAlbums', function () {
    it('should call fetch method', function () {
      var albums = (0, _main.searchAlbums)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    });
    it('should receive correct endpoint to fetch', function () {
      var albums = (0, _main.searchAlbums)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=album');
    });
  });

  describe('searchTracks', function () {
    it('should call fetch method', function () {
      var tracks = (0, _main.searchTracks)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    });
    it('should receive correct endpoint to fetch', function () {
      var tracks = (0, _main.searchTracks)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=tracks');
    });
  });

  describe('searchPlaylists', function () {
    it('should call fetch method', function () {
      var playlists = (0, _main.searchPlaylists)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    });
    it('should receive correct endpoint to fetch', function () {
      var playlists = (0, _main.searchPlaylists)('Michael Jackson');
      (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Michael Jackson&type=playlists');
    });
  });
});