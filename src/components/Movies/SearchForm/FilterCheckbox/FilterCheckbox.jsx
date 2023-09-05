import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ isChecked, setIsChecked, onCheckbox }) {

  const handleCheckboxChange = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    onCheckbox(newIsChecked);
  };

  return (
    <div className="checkbox-btn">
      <input
        type="checkbox"
        id="checkbox"
        className="checkbox-btn__input"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="checkbox" className="checkbox-btn__label"></label>
      <p className="checkbox-btn__text">Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;