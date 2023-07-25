const { useState, useEffect } = require('react');


export const App = () => {
    
    
    const [images, setImages] = useState([]);
    setImages(prevImages=>[...prevImages, ...images]);
    //w pixabay images to '.hits'
    
    
}


// componenetDidUpdate - START
async componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
        const data = await this.fetchImages();
        this.setState(prevState => ({
            ...prevState,
            images: [...prevState.images, ...data.hits],
        }));
    }
}  
// MÓJ - prevPage widzi jako undefined
// zmieniam (prevPage !== page) na (page !== 1)
useEffect (()=>{
    if (page !== 1) {
        const data = await fetchImages();
        setImages(prevImages => [...prevImages, ...data.hits])
    }    
},[page]);

//ARKA
useEffect(() => {
    const fetchData = async () => {
      const data = await fetchImages();
      setImages(prevImages => [...prevImages, ...data.hits]);
    };
    if (page !== 1) {
      fetchData();
    }
  }, [page]);

// componenetDidUpdate - END

// fetchImages - START

fetchImages = async () => {
    try {
      const { inputSearch, page } = this.state;
      this.setState({ isLoader: true });
      const response = await fetch(
        `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=36681363-b7657bef76d16cbfae88b6c43&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      this.totalHits = data.totalHits;
      this.setState({ isLoader: false });
      return data;
    } catch (error) {
      console.log('Error', error);
      this.setState({ isLoader: false });
    }
  };

// destrukturyzacja nie działa
//Uncaught (in promise) TypeError: Cannot destructure property 'page' of '_ref' as it is undefined.
  fetchImages = async () => {
    try {
     setIsLoader(true)
      const response = await fetch(
        `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=36681363-b7657bef76d16cbfae88b6c43&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      totalHits = data.totalHits;
      setIsLoader(false)
      return data;
    } catch (error) {
      console.log('Error', error);
      setIsLoader(false)
    }
  };
// fetchImages - END

// handleSubmit - START

handleSubmit = e => {
    e.preventDefault();
    this.inputSearch = e.target.elements.inputSearch.value;
    this.setState(
      prevState => {
        return {
          ...prevState,
          inputSearch: this.inputSearch,
        };
      },
      async () => {
        try {
          const response = await this.fetchImages();
          if (response.code !== 'ERR_NETWORK') {
            console.log(response);
            this.setState(prevState => ({
              ...prevState,
              images: response.hits,
            }));
            if (this.totalHits === 0) {
              alert('No images were found matching your listing, sorry.');
            }
            if (this.totalHits > this.state.perPage) {
              this.setState(prevState => {
                return { isMorePages: true };
              });
              // setIsPages(true);
            } else {
              this.setState(prevState => {
                return { isMorePages: false };
              });
              // setIsPages(false);
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

    handleSubmit = e => {
        e.preventDefault();
        inputSearch = e.target.elements.inputSearch.value;
       setInputSearch(prevInputSearch=>prevInputSearch, inputSearch,
          async () => {
            try {
              const response = await fetchImages();
              if (response.code !== 'ERR_NETWORK') {
                console.log(response);
                setImages(prevImages => [...prevImages, ...data.hits]);
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

// handleSubmit - END

// handleLoadMore - START
handleLoadMore = () => {
    this.setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
    let totalPages = 0;
    if (this.totalHits % this.state.perPage !== 0) {
      totalPages = Math.trunc(this.totalHits / this.state.perPage) + 1;
    } else if (this.totalHits % this.state.perPage === 0) {
      totalPages = this.totalHits / this.state.perPage;
    }
    if (totalPages === this.state.page) {
      this.setState(prevState => {
        return { isMorePages: false };
      });
      // this.setIsPages(false);
    }
  };

  handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
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
// handleLoadMore - END

// toggleModal - START

toggleModal = e => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
    this.largeImageURL = e.target.dataset.large;
    this.alt = e.target.dataset.alt;
    window.addEventListener('keyup', this.handleModalOnKey);
  };


  toggleModal = e => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen)
    largeImageURL = e.target.dataset.large;
    alt = e.target.dataset.alt;
    window.addEventListener('keyup', handleModalOnKey);
  };
// toggleModal - END

// handleModalOnKey - START
handleModalOnKey = e => {
    if (e.key === 'Escape') {
      this.setState(prevState => {
        return {
          isModalOpen: false,
        };
      });
      this.largeImageURL = '';
      this.alt = '';
      window.removeEventListener('keyup', this.handleModalOnKey);
    }
  };


  handleModalOnKey = e => {
    if (e.key === 'Escape') {          
    setIsModalOpen(false);
    };
      largeImageURL = '';
      alt = '';
      window.removeEventListener('keyup', handleModalOnKey);
    };
  
// handleModalOnKey - END

// return - START

// return (
//     <div className={css.app}>
//       {this.state.isLoader && <Loader />}
//       <Searchbar onSubmit={this.handleSubmit} />
//       <ImageGallery images={this.state.images} action={this.toggleModal} />
//       {this.state.isMorePages && (
//         <Button label="Load More" action={this.handleLoadMore} />
//       )}
//       <Modal
//         largeImageURL={this.largeImageURL}
//         alt={this.alt}
//         action={this.toggleModal}
//         actionKey={this.handleModalOnKey}
//         modal={this.state.isModalOpen}
//       />
//     </div>
//   );


  return (
    <div className={css.app}>
      {isLoader && <Loader />}
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} action={toggleModal} />
      {isMorePages && (
        <Button label="Load More" action={handleLoadMore} />
      )}
      <Modal
        largeImageURL={largeImageURL}
        alt={alt}
        action={toggleModal}
        actionKey={handleModalOnKey}
        modal={isModalOpen}
      />
    </div>
  );

// return - END