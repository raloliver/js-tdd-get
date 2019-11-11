export const search = (q, type) => {
  fetch(`https://api.spotify.com/v1/search?q=${q}&type=${type}`)
    .then(res => res.json());
};
export const searchArtists = (q) => search(q, 'artist');
export const searchAlbums = (q) => search(q, 'album');
export const searchTracks = (q) => search(q, 'tracks');
export const searchPlaylists = (q) => search(q, 'playlists');
