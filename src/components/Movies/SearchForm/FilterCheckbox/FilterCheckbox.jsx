import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="checkbox-btn">
      <input type="checkbox" id="checkbox" className="checkbox-btn__input" />
      <label for="checkbox" className="checkbox-btn__label"></label>
      <p className="checkbox-btn__text">Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;