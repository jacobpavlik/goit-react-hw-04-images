import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, action }) => {
  return (
    <ul className={css.ImageGallery} onClick={action}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          alt={image.tags}
        />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  name: PropTypes.string,
};
