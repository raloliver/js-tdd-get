import { expect } from 'chai';

describe('Album', () => {

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });
  });
});
