"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTracks = exports.getAlbums = exports.getAlbum = void 0;

var _config = require("./config");

const getAlbum = id => fetch(`${_config.APIURL}/albums/${id}`).then(res => res.json());

exports.getAlbum = getAlbum;

const getAlbums = ids => fetch(`${_config.APIURL}/albums/?ids=${ids}`).then(data => data.json());

exports.getAlbums = getAlbums;

const getTracks = id => fetch(`${_config.APIURL}/albums/${id}/tracks`).then(data => data.json());

exports.getTracks = getTracks;