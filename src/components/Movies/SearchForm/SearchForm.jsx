import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm({ searchQuery, setSearchQuery, onSearch, isChecked, setIsChecked }) {
  const [inputError, setInputError] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setInputError('Нужно ввести ключевое слово');
    } else {
      onSearch(isChecked);
      setInputError('');
    }
  };

  return (
    <section className="search">
      <form className="search__form" name="searchForm" onSubmit={handleSubmit} noValidate>
        <input className="search__input" placeholder="Фильм" value={searchQuery} onChange={handleInputChange} required />
        <button className="search__btn" type="submit" />
      </form>
      <span className={`search__error ${inputError ? 'search__error_active' : ''}`}>{inputError}</span>
      <FilterCheckbox isChecked={isChecked} setIsChecked={setIsChecked} onSearch={onSearch} />
    </section>
  )
}

export default SearchForm;