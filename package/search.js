"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPlaylists = exports.searchTracks = exports.searchAlbums = exports.searchArtists = exports.search = void 0;

var _config = require("./config");

const search = (q, type) => {
  fetch(`${_config.APIURL}/search?q=${q}&type=${type}`).then(res => res.json());
};

exports.search = search;

const searchArtists = q => search(q, 'artist');

exports.searchArtists = searchArtists;

const searchAlbums = q => search(q, 'album');

exports.searchAlbums = searchAlbums;

const searchTracks = q => search(q, 'tracks');

exports.searchTracks = searchTracks;

const searchPlaylists = q => search(q, 'playlists');

exports.searchPlaylists = searchPlaylists;