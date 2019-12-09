'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

var _album = require('../src/album');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_sinonChai2.default);

global.fetch = require('node-fetch');

describe('Album', function () {
  var fetchStub = void 0;
  var promise = void 0;

  beforeEach(function () {
    fetchStub = _sinon2.default.stub(global, 'fetch');
    promise = fetchStub.resolves({ json: function json() {
        album: 'Dirty Loops';
      } });
  });

  afterEach(function () {
    //return test to original state
    fetchStub.restore();
  });

  describe('smoke tests', function () {
    it('should have getAlbum method', function () {
      (0, _chai.expect)(_album.getAlbum).to.exist;
    });
    it('should have getAlbums method', function () {
      (0, _chai.expect)(_album.getAlbums).to.exist;
    });
    it('should have getTracks method', function () {
      (0, _chai.expect)(_album.getTracks).to.exist;
    });
  });

  describe('getAlbum', function () {
    //check fetch
    it('should call fetch method', function () {
      var album = (0, _album.getAlbum)();
      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    });
    //check fetch on url
    it('should call fetch url', function () {
      var album = (0, _album.getAlbum)('41MnTivkwTO3UUJ8DrqEJJ');
      (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/41MnTivkwTO3UUJ8DrqEJJ');
    });
    //check fetch with promise
    it('should return data', function () {
      var album = (0, _album.getAlbum)('41MnTivkwTO3UUJ8DrqEJJ');
      (0, _chai.expect)(album.resolveValue).to.be.eql({ json: 'Dirty Loops' });
    });
  });

  describe('getAlbums', function () {
    it('should call fetch method', function () {
      var albums = (0, _album.getAlbums)();
      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', function () {
      var albums = (0, _album.getAlbums)(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
      (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk');
    });

    it('should return the correct data from Promise', function () {
      var albums = (0, _album.getAlbums)(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
      albums.then(function (data) {
        (0, _chai.expect)(data).to.be.eql({ json: 'Dirty Loops' });
      });
    });
  });

  describe('getAlbumsTracks', function () {
    it('should call fetch method', function () {
      var tracks = (0, _album.getTracks)();
      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', function () {
      var tracks = (0, _album.getTracks)('4aawyAB9vmqN3uQ7FjRGTy');
      (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    it('should return the correct data from Promise', function () {
      var tracks = (0, _album.getTracks)('4aawyAB9vmqN3uQ7FjRGTy');
      (0, _chai.expect)(tracks.resolveValue).to.be.eql({ json: 'Dirty Loops' });
    });
  });
});