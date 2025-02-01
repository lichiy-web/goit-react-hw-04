import ImageCard from '../ImageCard/ImageCard.jsx';
import css from './ImageGallery.module.css';

const ImageGallery = ({ imageList }) => {
  return (
    <ul className={css.imageGallery}>
      {imageList.map(imageItem => {
        // console.log('imageItem => ', imageItem);
        return <ImageCard key={imageItem.id} imageItem={imageItem} />;
      })}
    </ul>
  );
};
export default ImageGallery;
