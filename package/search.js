'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPlaylists = exports.searchTracks = exports.searchAlbums = exports.searchArtists = exports.search = undefined;

var _config = require('./config');

var search = exports.search = function search(q, type) {
  fetch(_config.APIURL + '/search?q=' + q + '&type=' + type).then(function (res) {
    return res.json();
  });
};
var searchArtists = exports.searchArtists = function searchArtists(q) {
  return search(q, 'artist');
};
var searchAlbums = exports.searchAlbums = function searchAlbums(q) {
  return search(q, 'album');
};
var searchTracks = exports.searchTracks = function searchTracks(q) {
  return search(q, 'tracks');
};
var searchPlaylists = exports.searchPlaylists = function searchPlaylists(q) {
  return search(q, 'playlists');
};