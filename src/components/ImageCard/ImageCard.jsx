import css from './ImageCard.module.css';

const ImageCard = ({ imageItem, onImageView }) => {
  const { urls, alt_description, color } = imageItem;
  return (
    <li className={css.imageCard} onClick={() => onImageView(imageItem)}>
      <div className={css.preview}>
        <img
          className={css.previewImage}
          src={urls.small}
          alt={alt_description?.replace(/^\w/, m => m.toUpperCase())}
          style={{ border: `2px solid ${color}` }}
        />
      </div>
    </li>
  );
};
export default ImageCard;
