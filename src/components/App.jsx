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

// -1- CLASS START
// export class App extends Component {
//   state = {
//     images: [],
//     inputSearch: '',
//     isModalOpen: false,
//     page: 1,
//     isMorePages: false,
//     perPage: 12,
//     isLoader: false,
//   };
// -1- CLASS END

export const App = () => {
  // -1- HOOK START
  const [images, setImages] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isMorePages, setIsMorePages] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  // -1- HOOK END

  // -2- CLASS START
  // async componentDidMount() {
  //   this.fetchImages();
  // }
  // -2- CLASS END

  // -2- HOOK START
  useEffect(() => {
    console.log('useEffect-ComponentDidMount');
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // -2- HOOK END

  // -3- CLASS START
  // async componentDidUpdate(prevProps, prevState) {
  //   if (prevState.page !== this.state.page) {
  //     const data = await this.fetchImages();
  //     this.setState(prevState => ({
  //       ...prevState,
  //       images: [...prevState.images, ...data.hits],
  //     }));
  //   }
  // }
  // -3- CLASS END

  // -3- HOOK START
  // WERSJA 1 - START

  useEffect(() => {
    if (page !== 1) {
      const data = fetchImages();
      setImages(prevImages => [...prevImages, ...data.hits]);
    }
  }, [page]);

  // WERSJA 1 - END

  // WERSJA 2 - START

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetchImages();
  //     setImages(prevImages => [...prevImages, ...data.hits]);
  //   };
  //   if (page !== 1) {
  //     fetchData();
  //   }
  // }, [page]);

  // WERSJA 2 - END
  // -3- HOOK END

  // -4- CLASS START
  // Poprawiony setState z callbackiem
  // fetchImages = async () => {
  //   try {
  //     const { inputSearch, page } = this.state;
  //     this.setState({ isLoader: true });
  //     const response = await fetch(
  //       `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=36681363-b7657bef76d16cbfae88b6c43&image_type=photo&orientation=horizontal&per_page=12`
  //       );
  //       const data = await response.json();
  //       this.totalHits = data.totalHits;
  //       this.setState({ isLoader: false });
  //       return data;
  //     } catch (error) {
  //       console.log('Error', error);
  //       this.setState({ isLoader: false });
  //     }
  //   };
  // -4- CLASS END

  // -4- HOOK START
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
  // -4- HOOK END

  // -5- CLASS START
  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.inputSearch = e.target.elements.inputSearch.value;
  //   this.setState(
  //     prevState => {
  //       return {
  //         ...prevState,
  //         inputSearch: this.inputSearch,
  //       };
  //     },
  //     async () => {
  //       try {
  //         const response = await this.fetchImages();
  //         if (response.code !== 'ERR_NETWORK') {
  //           console.log(response);
  //           this.setState(prevState => ({
  //             ...prevState,
  //             images: response.hits,
  //           }));
  //           if (this.totalHits === 0) {
  //             alert('No images were found matching your listing, sorry.');
  //           }
  //           if (this.totalHits > this.state.perPage) {
  //             this.setState(prevState => {
  //               return { isMorePages: true };
  //             });
  //             // setIsPages(true);
  //           } else {
  //             this.setState(prevState => {
  //               return { isMorePages: false };
  //             });
  //             // setIsPages(false);
  //           }
  //         } else {
  //           console.log(`${response.code}`);
  //         }
  //       } catch (error) {
  //         console.log(`${error}`);
  //       }
  //     }
  //     );
  //   };

  //       jak najmniej w state ma być - dodaję na sztywno, pozostawiam tylko inputSearch(wyszukiwanie) i page(loadMore)
  //       `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${perPage}`

  // koniec poprawionego setState z callbackiem
  // -5- CLASS END

  // -5- HOOK START
  const handleSubmit = e => {
    e.preventDefault();
    setInputSearch(e.target.elements.inputSearch.value);
    setInputSearch(
      prevInputSearch => prevInputSearch,
      inputSearch,
      async () => {
        try {
          const response = await fetchImages();
          if (response.code !== 'ERR_NETWORK') {
            console.log(response);
            setImages(prevImages => [...prevImages, ...response.hits]);
            if (totalHits === 0) {
              alert('No images were found matching your listing, sorry.');
            }
            if (totalHits > perPage) {
              setIsMorePages(true);
            } else {
              setIsMorePages(true);
            }
          } else {
            console.log(`${response.code}`);
          }
        } catch (error) {
          console.log(`${error}`);
        }
      }
    );
  };
  // -5- HOOK END

  // -6- CLASS START
  // handleLoadMore = () => {
  //   this.setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
  //   let totalPages = 0;
  //   if (this.totalHits % this.state.perPage !== 0) {
  //     totalPages = Math.trunc(this.totalHits / this.state.perPage) + 1;
  //   } else if (this.totalHits % this.state.perPage === 0) {
  //     totalPages = this.totalHits / this.state.perPage;
  //   }
  //   if (totalPages === this.state.page) {
  //     this.setState(prevState => {
  //       return { isMorePages: false };
  //     });
  //     // this.setIsPages(false);
  //   }
  // };
  // -6- CLASS END

  // -6- HOOK START
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
  // -6- HOOK END

  // -7- CLASS START
  // toggleModal = e => {
  //   this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  //   this.largeImageURL = e.target.dataset.large;
  //   this.alt = e.target.dataset.alt;
  //   window.addEventListener('keyup', this.handleModalOnKey);
  // };
  // -7- CLASS END

  // -7- HOOK START
  const toggleModal = e => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
    largeImageURL = e.target.dataset.large;
    alt = e.target.dataset.alt;
    window.addEventListener('keyup', handleModalOnKey);
  };
  // -7- HOOK END

  // -8- CLASS START
  // handleModalOnKey = e => {
  //   if (e.key === 'Escape') {
  //     this.setState(prevState => {
  //       return {
  //         isModalOpen: false,
  //       };
  //     });
  //     this.largeImageURL = '';
  //     this.alt = '';
  //     window.removeEventListener('keyup', this.handleModalOnKey);
  //   }
  // };
  // -8- CLASS END

  // -8- HOOK START
  const handleModalOnKey = e => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
    largeImageURL = '';
    alt = '';
    window.removeEventListener('keyup', handleModalOnKey);
  };
  // -8- HOOK END

  // -9- CLASS START
  //    render() {
  // return (
  //   <div className={css.app}>
  //       {this.state.isLoader && <Loader />}
  //       <Searchbar onSubmit={this.handleSubmit} />
  //       <ImageGallery images={this.state.images} action={this.toggleModal} />
  //       {this.state.isMorePages && (
  //         <Button label="Load More" action={this.handleLoadMore} />
  //         )}
  //       <Modal
  //         largeImageURL={this.largeImageURL}
  //         alt={this.alt}
  //         action={this.toggleModal}
  //         actionKey={this.handleModalOnKey}
  //         modal={this.state.isModalOpen}
  //         />
  //     </div>
  //   );
  //    } // render
  // -9- CLASS END

  // -9- HOOK START
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
  // -9- HOOK END
}; // koniec App
