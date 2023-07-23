import React, { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
export class App extends Component {
  state = {
    images: [],
    inputSearch: '',
    isModalOpen: false,
    page: 1,
    isMorePages: false,
    perPage: 12,
    isLoader: false,
  };
  totalHits = 0;

  async componentDidMount() {
    this.fetchImages();
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      const data = await this.fetchImages();
      this.setState(prevState => ({
        ...prevState,
        images: [...prevState.images, ...data.hits],
      }));
    }
  }

  // Poprawiony setState z callbackiem

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
  //       jak najmniej w state ma być - dodaję na sztywno, pozostawiam tylko inputSearch(wyszukiwanie) i page(loadMore)
  //       `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${perPage}`

  // koniec poprawionego setState z callbackiem

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

  toggleModal = e => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
    this.largeImageURL = e.target.dataset.large;
    this.alt = e.target.dataset.alt;
    window.addEventListener('keyup', this.handleModalOnKey);
  };
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

  render() {
    return (
      <div className={css.app}>
        {this.state.isLoader && <Loader />}
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} action={this.toggleModal} />
        {this.state.isMorePages && (
          <Button label="Load More" action={this.handleLoadMore} />
        )}
        <Modal
          largeImageURL={this.largeImageURL}
          alt={this.alt}
          action={this.toggleModal}
          actionKey={this.handleModalOnKey}
          modal={this.state.isModalOpen}
        />
      </div>
    );
  }
}
