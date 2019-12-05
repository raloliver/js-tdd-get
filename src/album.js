import { APIURL } from './config';

export const getAlbum = id => fetch(`${APIURL}/albums/${id}`).then(res => res.json());
export const getAlbums = id => fetch(`${APIURL}/albums/?ids=${ids}`).then(data => data.json());
export const getAlbumTracks = id => fetch(`${APIURL}/albums/${id}/tracks`).then(data => data.json());
