import css from './ImageCard.module.css';

function normalizeAlt(slug) {
  slug = slug.trim().split('-');
  slug.pop();
  slug[0] = slug[0].replace(/^\w/, m => m.toUpperCase());
  return slug.join(' ');
}

const ImageCard = ({ imageItem: { slug, urls } }) => {
  //   console.log(`slug = ${slug}`);
  //   console.log('urls => ', urls);
  return (
    <li className={css.imageCard}>
      <div className={css.preview}>
        <img
          className={css.previewImage}
          src={urls.small}
          alt={normalizeAlt(slug)}
        />
      </div>
    </li>
  );
};
export default ImageCard;
