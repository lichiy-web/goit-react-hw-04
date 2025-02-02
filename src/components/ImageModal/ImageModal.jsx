import { useState } from 'react';
import css from './ImageModal.module.css';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onCloseModal, url }) => {
  return (
    <div>
      {/* <button onClick={onOpenModal}>Open Modal</button> */}
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Image Modal"
      >
        {/* <button onClick={onCloseModal}>close</button>
        <div>I am a modal</div> */}
        <img src={url} alt="" className={css.imageViewer} />
      </Modal>
    </div>
  );
};
export default ImageModal;
