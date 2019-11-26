export const getAlbum = id => fetch(`https://api.spotify.com/v1/albums/${id}`).then(res => res.json());
export const getAlbumTracks = () => { };
