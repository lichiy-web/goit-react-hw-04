// import { useState } from 'react';
import css from './ImageModal.module.css';
import Modal from 'react-modal';
// import { Slide } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10000,
    // color: 'lightsteelblue',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0, .6)',
    // filter: 'blur(5px)',
    zIndex: 0,
    // filter: 'blur(5px)',
  },
};

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onCloseModal, currentImageItem }) => {
  if (!isOpen) return;
  // console.log('ImageModal: currentImageItem=> ', currentImageItem);
  // console.log('ImageModal: isOpen=> ', isOpen);
  const { urls, alt_description } = currentImageItem;
  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Image Modal"
      >
        <img
          src={urls?.full}
          alt={alt_description}
          className={css.imageViewer}
        />
      </Modal>
    </div>
  );
};
export default ImageModal;
