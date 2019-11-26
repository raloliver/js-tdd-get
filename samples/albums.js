global.fetch = require('node-fetch');

import { searchAlbums } from '../src/main';

const albums = searchAlbums('Dirty Loop');

albums.then(res => res.albums.items.map(item => console.log(item.name)));
