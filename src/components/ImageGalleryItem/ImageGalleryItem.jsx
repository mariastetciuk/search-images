import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ url, largeURL, description }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(prevState => !prevState);

  return (
    <>
      <img
        className={css.img}
        src={url}
        alt={description}
        onClick={toggleModal}
      />
      {showModal && (
        <Modal
          largeURL={largeURL}
          description={description}
          closeModal={toggleModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  largeURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
