import { useState, useEffect, useRef, useId } from 'react';
import './App.css';
import response from '../assets/response.json';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Loader from './Loader/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage.jsx';

import SearchBar from './SearchBar/SearchBar.jsx';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn.jsx';
import { findImages } from './services/api.js';

// console.log('imageList => ', response.results);

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const [query, setQuery] = useState('');
  const [isEmpty, setIsEmpty] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = e => {
    console.log(e);
    e.preventDefault();
    setQuery(e.target.elements.search.value);
    setImages([]);
  };

  useEffect(() => {
    if (!query) return;
    findImages(query, page, perPage)
      .then(({ data }) => {
        const { results, total_pages } = data;
        console.log(data);
        console.log(`total_pages = ${total_pages}`, results);
        if (!results.length) {
          setIsEmpty(true);
        }
        setImages(results);
      })
      .catch(err => {
        console.error(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page, perPage]);

  return (
    <div className="main-container">
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery imageList={images} />
      <Loader isLoading={isLoading} />
      {isError && <ErrorMessage />}
      {!!images.length && <LoadMoreBtn />}
      {isEmpty && <div>No images...</div>}
    </div>
  );
}

export default App;
