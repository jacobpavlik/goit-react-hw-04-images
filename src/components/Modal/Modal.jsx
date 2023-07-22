import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ largeImageURL, alt, action, actionKey, modal }) => {
  if (modal) {
    return (
      <div className={css.overlay} onClick={action}>
        <div className={css.modal} onKeyDown={actionKey}>
          <img src={largeImageURL} alt={alt} />
        </div>
      </div>
    );
  }
};
Modal.propTypes = {
  largeImageURL: PropTypes.string,
  alt: PropTypes.string,
  action: PropTypes.func,
  actionKey: PropTypes.func,
  modal: PropTypes.bool,
};
