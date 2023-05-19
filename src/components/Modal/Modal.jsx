import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ largeURL, description, closeModal }) => {
  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  const handlePressESC = useCallback(() => {
    return event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
  }, [closeModal]);

  useEffect(() => {
    document.addEventListener('keydown', handlePressESC);
  }, [handlePressESC]);

  useEffect(() => {
    return () => {
      document.removeEventListener('keydown', handlePressESC);
    };
  }, [handlePressESC]);

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <img src={largeURL} alt={description} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
