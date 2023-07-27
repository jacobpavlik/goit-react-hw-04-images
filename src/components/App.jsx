// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

let totalHits = 0;
let perPage = 12;
let largeImageURL = '';
let alt = '';

export const App = () => {
  const [images, setImages] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isMorePages, setIsMorePages] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    console.log('useEffect-ComponentDidMount');
    (async () => {
      try {
        const response = await fetchImages();
        if (response.code !== 'ERR_NETWORK') {
          console.log(response);
          setImages([...response.hits]);
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
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (page !== 1) {
      const data = async () => {
        const data = await fetchImages();
        setImages(prevImages => [...prevImages, ...data.hits]);
      };
      data();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    console.log(inputSearch);
    if (inputSearch !== '') {
      const data = async () => {
        try {
          const response = await fetchImages();
          if (response.code !== 'ERR_NETWORK') {
            console.log(response);
            setImages([...response.hits]);
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
      data();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearch]);

  const fetchImages = async () => {
    try {
      setIsLoader(true);
      const response = await fetch(
        `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=36681363-b7657bef76d16cbfae88b6c43&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      totalHits = data.totalHits;
      setIsLoader(false);
      return data;
    } catch (error) {
      console.log('Error', error);
      setIsLoader(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setInputSearch(e.target.elements.inputSearch.value);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    let totalPages = 0;
    if (totalHits % perPage !== 0) {
      totalPages = Math.trunc(totalHits / perPage) + 1;
    } else if (totalHits % perPage === 0) {
      totalPages = totalHits / perPage;
    }
    if (totalPages === page) {
      setIsMorePages(false);
    }
  };

  const toggleModal = e => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
    largeImageURL = e.target.dataset.large;
    alt = e.target.dataset.alt;
    window.addEventListener('keyup', handleModalOnKey);
  };

  const handleModalOnKey = e => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
    largeImageURL = '';
    alt = '';
    window.removeEventListener('keyup', handleModalOnKey);
  };

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
