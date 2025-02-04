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
const firstPage = 1;

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(firstPage);
  const [perPage, setPerPage] = useState(defaultPerPage);
  const [query, setQuery] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageItem, setCurrentImageItem] = useState({});

  const handleSubmit = e => {
    // console.log('handleSubmit is called...');
    e.preventDefault();

    const newQuery = e.target.elements.search.value;
    if (newQuery.trim() === '') {
      toast.error('Search query cannot be empty!', {
        duration: 4000,
      });
      return;
    }
    setPerPage(defaultPerPage);
    setPage(firstPage);
    setIsLoading(false);
    setIsError(false);
    setIsEmpty(false);
    setIsLastPage(false);
    setImages([]);
    setQuery(newQuery);
  };

  const handleLoadMore = () => {
    setIsError(false);
    setPage(prev => prev + 1);
  };

  const handleOpenModal = newImageItem => {
    setCurrentImageItem(newImageItem);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentImageItem({});
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    findImages(query, page, perPage)
      .then(({ data }) => {
        const { results, total_pages } = data;
        if (page === total_pages) {
          setIsLastPage(true);
        }
        if (!results.length) {
          setIsEmpty(true);
          setPage(firstPage);
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
        onCloseModal={handleCloseModal}
        currentImageItem={currentImageItem}
      />
    </div>
  );
}

export default App;
