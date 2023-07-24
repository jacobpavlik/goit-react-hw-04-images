import { useEffect } from 'react';
import { useState } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

let perPage = 12;
let totalHits = 0;

export const App = () => {
  const [images, setImages] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isMorePages, setIsMorePages] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    console.log('useEffect-ComponentDidMount');
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   fetchImages(inputSearch);
  // }, [inputSearch]);

  // useEffect(() => {
  //   if (prevState !== page) {
  //     fetchImages();
  //   }
  // }, [page]);

  const fetchImages = async () => {
    try {
      // setInputSearch(inputSearch);
      // setPage(page);
      // const { inputSearch, page } = this.state;
      //this.setState({ isLoader: true });
      setIsLoader(true);
      const response = await fetch(
        `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=36681363-b7657bef76d16cbfae88b6c43&image_type=photo&orientation=horizontal&per_page=12`
      );
      // przeniesione z dołu - compiluje się ale dziwnie - linie 98-122
      // if (response.code !== 'ERR_NETWORK') {
      //   console.log('response', response);
      //   setImages(prevState => [{ ...prevState, images: response.hits }]);
      //   if (totalHits === 0) {
      //     alert('No images were found matching your listing, sorry.');
      //   }
      //   if (totalHits > perPage) {
      //     // this.setState(prevState => {
      //     //   return { isMorePages: true };
      //     // });
      //     setIsMorePages(true);
      //   } else {
      //     //this.setState(prevState => {
      //     //  return { isMorePages: false };
      //     //});
      //     setIsMorePages(false);
      //   }
      // } else {
      //   console.log(`${response.code}`);
      // }
      const data = await response.json();
      totalHits = data.totalHits;
      //this.setState({ isLoader: false });
      setIsLoader(false);
      return data;
    } catch (error) {
      console.log('Error', error);
      setIsLoader(false);
      // this.setState({ isLoader: false });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setInputSearch(e.target.elements.inputSearch.value);
    // console.log('inputsearch 1', inputSearch);
    setInputSearch(
      prevState => prevState,
      inputSearch,
      // fetchImages();

      // setInputSearch(
      //   prevState => {
      //     return {
      //       ...prevState,
      //       inputSearch: inputSearch,
      //     };
      //   },
      // console.log('inputSearch 2', inputSearch),
      async () => {
        try {
          const response = await fetchImages();
          if (response.code !== 'ERR_NETWORK') {
            // console.log('response', response);
            setImages(prevState => [
              {
                ...prevState,
                images: response.hits,
              },
            ]);
            if (totalHits === 0) {
              alert('No images were found matching your listing, sorry.');
            }
            if (totalHits > perPage) {
              // this.setState(prevState => {
              //   return { isMorePages: true };
              // });
              setIsMorePages(true);
            } else {
              //this.setState(prevState => {
              //  return { isMorePages: false };
              //});
              setIsMorePages(false);
            }
          } else {
            console.log(`${response.code}`);
          }
        } catch (error) {
          console.log(`${error}`);
        }
      }
    ); // tu jest nawias od setInputSearch
  };
  //       jak najmniej w state ma być - dodaję na sztywno, pozostawiam tylko inputSearch(wyszukiwanie) i page(loadMore)
  //       `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${perPage}`

  // koniec poprawionego setState z callbackiem

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    let totalPages = 0;
    if (totalHits % perPage !== 0) {
      totalPages = Math.trunc(totalHits / perPage) + 1;
    } else if (totalHits % perPage === 0) {
      totalPages = totalHits / perPage;
    }
    if (totalPages === page) {
      setPage(prevPage => {
        setIsMorePages(false);

        //  return { isMorePages: false };
      });
      // this.setIsPages(false);
    }
  };

  const toggleModal = e => {
    setIsModalOpen(prevState => !prevState);
    images.largeImageURL = e.target.dataset.large;
    images.alt = e.target.dataset.alt;
    window.addEventListener('keyup', handleModalOnKey);
  };
  const handleModalOnKey = e => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
      // setIsModalOpen(prevState => {
      //   return {
      //     isModalOpen: false,
      //   };
      // });
      images.largeImageURL = '';
      images.alt = '';
      window.removeEventListener('keyup', handleModalOnKey);
    }
  };

  return (
    <div className={css.app}>
      {isLoader && <Loader />}
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} action={toggleModal} />
      {isMorePages && <Button label="Load More" action={handleLoadMore} />}
      <Modal
        largeImageURL={images.largeImageURL}
        alt={images.alt}
        action={toggleModal}
        actionKey={handleModalOnKey}
        modal={isModalOpen}
      />
    </div>
  );
};

// axios - jak zdążę
// async function fetchImages() {
//   try {
//     const response = await axios.get('/user?ID=12345', {params:{
//         inputSearch:{}
//         page: 1
//     }});
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
