import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  state = {
    isModalOpen: false,
  };

  render() {
    const { largeImageURL, alt, action, actionKey, modal } = this.props;
    if (modal) {
      return (
        <div className={css.overlay} onClick={action}>
          <div className={css.modal} onKeyDown={actionKey}>
            <img src={largeImageURL} alt={alt} />
          </div>
        </div>
      );
    }
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  alt: PropTypes.string,
  action: PropTypes.func,
  actionKey: PropTypes.func,
};

// funkcyjny - też działa
// export const Modal = ({ largeImageURL, alt, action, actionKey }) => (
//   <div className={css.overlay} onClick={action}>
//     <div className={css.modal} onKeyDown={actionKey}>
//       <img src={largeImageURL} alt={alt} />
//     </div>
//   </div>
// );
