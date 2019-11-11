export const search = (q, type) => {
  fetch(`https://api.spotify.com/v1/search?q=${q}&type=${type}`);
};
export const searchAlbums = () => { };
export const searchArtists = () => { };
export const searchTracks = () => { };
export const searchPlaylists = () => { };
