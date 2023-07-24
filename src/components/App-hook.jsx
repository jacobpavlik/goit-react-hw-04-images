import React, { useState, useEffect, useCallback } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

let largeImageURL = '';
let alt = '';

export const App = () => {
  const [images, setImages] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isMorePages, setIsMorePages] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const perPage = 12;

  const fetchImages = useCallback(async () => {
    try {
      setIsLoader(true);
      const response = await fetch(
        `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=123456&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );
      const data = await response.json();
      setTotalHits(data.totalHits);
      setIsLoader(false);
      return data;
    } catch (error) {
      console.log('Error', error);
      setIsLoader(false);
    }
  }, [inputSearch, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    if (page !== 1) {
      const fetchData = async () => {
        const data = await fetchImages();
        setImages(prevImages => [...prevImages, ...data.hits]);
      };
      fetchData();
    }
  }, [page, fetchImages]);

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    const newInputSearch = e.target.elements.inputSearch.value;
    setInputSearch(newInputSearch);
    setPage(1);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchImages();
        if (response.code !== 'ERR_NETWORK') {
          setImages(response.hits);
          if (totalHits === 0) {
            alert('No images were found matching your listing, sorry.');
          }
          if (totalHits > perPage) {
            setIsMorePages(true);
          } else {
            setIsMorePages(false);
          }
        } else {
          console.log(`${response.code}`);
        }
      } catch (error) {
        console.log(`${error}`);
      }
    };
    fetchData();
  }, [fetchImages, totalHits, perPage]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = useCallback(e => {
    setIsModalOpen(prevState => !prevState.isModalOpen);
    const largeImageURL = e.target.dataset.large;
    const alt = e.target.dataset.alt;
  }, []);

  const handleModalOnKey = useCallback(
    e => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        largeImageURL = '';
        alt = '';
        window.removeEventListener('keyup', handleModalOnKey);
      }
    },
    [handleModalOnKey]
  );

  return (
    <div className={css.app}>
      {isLoader && <Loader />}
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} action={toggleModal} />
      {isMorePages && <Button label="Load More" action={handleLoadMore} />}
      <Modal
        largeImageURL={largeImageURL}
        alt={alt}
        action={toggleModal}
        actionKey={handleModalOnKey}
        modal={isModalOpen}
      />
    </div>
  );
};

// export default App;
