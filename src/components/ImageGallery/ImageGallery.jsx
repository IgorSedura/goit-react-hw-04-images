import { ImageGaleryItemImage } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import { ImageGalleryStyles, ImageItem } from './ImageGalleryStyles';

export const ImageGallery = ({ photos, onSelect }) => {
  return (
    <ImageGalleryStyles>
      {photos.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageItem key={id}>
            <ImageGaleryItemImage
              photos={photos}
              onSelect={onSelect}
              smallImg={webformatURL}
              largeImg={largeImageURL}
              tags={tags}
            />
          </ImageItem>
        );
      })}
    </ImageGalleryStyles>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};
