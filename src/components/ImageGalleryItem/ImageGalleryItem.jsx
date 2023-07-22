import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags }) => {
  return (
    <li key={id} className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        large={largeImageURL}
        data-alt={tags}
        data-large={largeImageURL}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  alt: PropTypes.string,
  largeImageURL: PropTypes.string,
};
