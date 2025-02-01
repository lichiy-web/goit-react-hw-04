import { useState, useEffect, useRef, useId } from 'react';
import './App.css';
import response from '../assets/response.json';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Loader from './Loader/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage.jsx';

import SearchBar from './SearchBar/SearchBar.jsx';

// console.log('imageList => ', response.results);

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = e => {
    console.log(e);
    e.preventDefault();
    // console.log(e.target.elements.search.value);
    setQuery(e.target.elements.search.value);
    setImages([]);
  };

  return (
    <div className="main-container">
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery imageList={response.results} />
      <Loader isLoading={isLoading} />
      <ErrorMessage isError={isError} />
    </div>
  );
}

export default App;
