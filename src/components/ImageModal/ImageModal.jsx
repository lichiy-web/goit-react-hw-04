// import { useState } from 'react';
import css from './ImageModal.module.css';
import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io';
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
    backgroundColor: '#888888',
    padding: 0,
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
  // if (!isOpen) return;
  // console.log('ImageModal: currentImageItem=> ', currentImageItem);
  // console.log('ImageModal: isOpen=> ', isOpen);
  const {
    urls,
    alt_description,
    description,
    likes,
    user: { name, bio, location, profile_image },
    color,
  } = currentImageItem;

  console.log(
    urls,
    alt_description,
    description,
    likes,
    name,
    bio,
    location,
    profile_image,
    color
  );
  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Image Modal"
      >
        <figure className={css.modalImageViewer}>
          <button className={css.modalCloseBtn} onClick={onCloseModal}>
            <IoMdClose />
          </button>
          <div className={css.modalImageWrap}>
            <img
              src={urls?.full}
              alt={alt_description?.replace(/^\w/, m => m.toUpperCase())}
              className={css.modalImage}
              style={{ border: `2px solid ${color}` }}
            />
          </div>
          <figcaption className={css.modalCaption}>
            <h4 className={css.modalTitle}>
              {description?.replace(/^\w/, m => m.toUpperCase())}
            </h4>
            <div className={css.modalImageInfo}>
              <div className={css.modalImageLikes}>{likes}</div>
              <div className={css.modalAuthorName}>{name}</div>
              <div className={css.modalAuthorLocation}>{location}</div>
            </div>
          </figcaption>
        </figure>
      </Modal>
    </div>
  );
};
export default ImageModal;
