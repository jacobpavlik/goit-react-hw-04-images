// import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form onSubmit={onSubmit} className={css.searchForm} name="searchform">
        <button type="submit" className={css.searchFormButton} name="searchbtn">
          <span className={css.searchFormButtonLabel}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
        </button>
        <input
          name="inputSearch"
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  searchInput: PropTypes.string,
};

Searchbar.propTypes = {
  searchInput: PropTypes.string,
};
