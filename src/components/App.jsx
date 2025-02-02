import { useState, useEffect } from 'react';
import './App.css';
// import response from '../assets/response.json';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Loader from './Loader/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage.jsx';

import SearchBar from './SearchBar/SearchBar.jsx';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn.jsx';
import { findImages } from './services/api.js';
import toast from 'react-hot-toast';
import Notification from './Notification/Notification.jsx';
import ImageModal from './ImageModal/ImageModal.jsx';

// console.log('imageList => ', response.results);

const defaultPerPage = 12;

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(defaultPerPage);
  const [query, setQuery] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [url, setUrl] = useState('');

  const handleSubmit = e => {
    console.log('handleSubmit is called...');
    e.preventDefault();

    const newQuery = e.target.elements.search.value;
    if (newQuery.trim() === '') {
      toast.error('Search query cannot be empty!', {
        duration: 4000,
      });
      return;
    }
    setPerPage(defaultPerPage);
    setIsLoading(false);
    setIsError(false);
    setIsEmpty(false);
    setIsLastPage(false);
    setImages([]);
    setQuery(newQuery);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleOpenModal = url => {
    setUrl(url);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setUrl('');
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    findImages(query, page, perPage)
      .then(({ data }) => {
        const { results, total_pages } = data;
        if (page === total_pages - 1) {
          setIsLastPage(true);
        }
        // console.log(data);
        // console.log(`total_pages = ${total_pages}`, results);
        if (!results.length) {
          setIsEmpty(true);
          setPage(0);
          setQuery('');
        }
        setImages(prev => [...prev, ...results]);
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
      <ImageGallery imageList={images} onImageView={handleOpenModal} />
      <Loader
        isLoading={isLoading}
        strokeColor={page === 0 ? '#000000' : '#eeeeee'}
      />
      {isError && <ErrorMessage />}
      {!!images.length && !isLastPage && (
        <LoadMoreBtn onLoadMore={handleLoadMore} isLoading={isLoading} />
      )}
      {isEmpty && (
        <Notification>
          There are no matches for your search query...
        </Notification>
      )}
      <ImageModal
        isOpen={modalIsOpen}
        // onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        url={url}
      />
    </div>
  );
}

export default App;
