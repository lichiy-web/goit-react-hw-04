import ImageCard from '../ImageCard/ImageCard.jsx';
import css from './ImageGallery.module.css';

const ImageGallery = ({ imageList, onImageView }) => {
  return (
    <ul className={css.imageGallery}>
      {imageList.map(imageItem => {
        return (
          <ImageCard
            key={imageItem.id}
            imageItem={imageItem}
            onImageView={onImageView}
          />
        );
      })}
    </ul>
  );
};
export default ImageGallery;
