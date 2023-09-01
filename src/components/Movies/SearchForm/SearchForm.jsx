import React from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm({ searchQuery, setSearchQuery, onSearch }) {

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input className="search__input" placeholder="Фильм" value={searchQuery} onChange={handleInputChange} required />
        <button className="search__btn" type="submit" />
      </form>
      <FilterCheckbox />
    </section>
  )
}

export default SearchForm;