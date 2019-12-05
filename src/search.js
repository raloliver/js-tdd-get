import { APIURL } from './config';

export const search = (q, type) => {
  fetch(`${APIURL}/search?q=${q}&type=${type}`)
    .then(res => res.json());
};
export const searchArtists = (q) => search(q, 'artist');
export const searchAlbums = (q) => search(q, 'album');
export const searchTracks = (q) => search(q, 'tracks');
export const searchPlaylists = (q) => search(q, 'playlists');
