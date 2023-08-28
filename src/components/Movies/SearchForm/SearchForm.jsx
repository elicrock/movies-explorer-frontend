import React from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <input className="search__input" placeholder="Фильм" required />
        <button className="search__btn" type="submit" />
      </form>
      <FilterCheckbox />
    </section>
  )
}

export default SearchForm;