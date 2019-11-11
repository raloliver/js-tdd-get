import { expect } from 'chai';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from './main';

describe('API Wrapper', () => {

  describe('smoke tests', () => {

    //search: get generics and more than one type
    //searchAlbums
    //searchArtists
    //searchTracks
    //searchPlaylists

    it('should exist the `search` method', () => {
      expect(search).to.exist;
    });

    it('should exist the `searchAlbums` method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the `searchArtists` method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the `searchTracks` method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the `searchPlaylists` method', () => {
      expect(searchPlaylists).to.exist;
    });

  });

  describe('generic search', () => {
    it('should call fetch function', () =>{
      const items = search();
    });
  });
});
