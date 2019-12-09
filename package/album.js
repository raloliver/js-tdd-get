'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTracks = exports.getAlbums = exports.getAlbum = undefined;

var _config = require('./config');

var getAlbum = exports.getAlbum = function getAlbum(id) {
  return fetch(_config.APIURL + '/albums/' + id).then(function (res) {
    return res.json();
  });
};
var getAlbums = exports.getAlbums = function getAlbums(ids) {
  return fetch(_config.APIURL + '/albums/?ids=' + ids).then(function (data) {
    return data.json();
  });
};
var getTracks = exports.getTracks = function getTracks(id) {
  return fetch(_config.APIURL + '/albums/' + id + '/tracks').then(function (data) {
    return data.json();
  });
};