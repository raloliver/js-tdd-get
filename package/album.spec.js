"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _sinon = _interopRequireDefault(require("sinon"));

var _sinonChai = _interopRequireDefault(require("sinon-chai"));

var _album = require("../src/album");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_chai.default.use(_sinonChai.default);

global.fetch = require('node-fetch');
describe('Album', () => {
  let fetchStub;
  let promise;
  beforeEach(() => {
    fetchStub = _sinon.default.stub(global, 'fetch');
    promise = fetchStub.resolves({
      json: () => {
        album: 'Dirty Loops';
      }
    });
  });
  afterEach(() => {
    //return test to original state
    fetchStub.restore();
  });
  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      (0, _chai.expect)(_album.getAlbum).to.exist;
    });
    it('should have getAlbums method', () => {
      (0, _chai.expect)(_album.getAlbums).to.exist;
    });
    it('should have getTracks method', () => {
      (0, _chai.expect)(_album.getTracks).to.exist;
    });
  });
  describe('getAlbum', () => {
    //check fetch
    it('should call fetch method', () => {
      const album = (0, _album.getAlbum)();
      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    }); //check fetch on url

    it('should call fetch url', () => {
      const album = (0, _album.getAlbum)('41MnTivkwTO3UUJ8DrqEJJ');
      (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/41MnTivkwTO3UUJ8DrqEJJ');
    }); //check fetch with promise

    it('should return data', () => {
      const album = (0, _album.getAlbum)('41MnTivkwTO3UUJ8DrqEJJ');
      (0, _chai.expect)(album.resolveValue).to.be.eql({
        json: 'Dirty Loops'
      });
    });
  });
  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = (0, _album.getAlbums)();
      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const albums = (0, _album.getAlbums)(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
      (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk');
    });
    it('should return the correct data from Promise', () => {
      const albums = (0, _album.getAlbums)(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
      albums.then(data => {
        (0, _chai.expect)(data).to.be.eql({
          json: 'Dirty Loops'
        });
      });
    });
  });
  describe('getAlbumsTracks', () => {
    it('should call fetch method', () => {
      const tracks = (0, _album.getTracks)();
      (0, _chai.expect)(fetchStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const tracks = (0, _album.getTracks)('4aawyAB9vmqN3uQ7FjRGTy');
      (0, _chai.expect)(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });
    it('should return the correct data from Promise', () => {
      const tracks = (0, _album.getTracks)('4aawyAB9vmqN3uQ7FjRGTy');
      (0, _chai.expect)(tracks.resolveValue).to.be.eql({
        json: 'Dirty Loops'
      });
    });
  });
});