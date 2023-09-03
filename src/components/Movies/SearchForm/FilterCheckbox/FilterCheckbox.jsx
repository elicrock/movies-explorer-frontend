import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ isChecked, setIsChecked, onSearch }) {

  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  //   onSearch();
  //   console.log(isChecked);
  // };

  // const handleCheckboxChange = () => {
  //   setIsChecked((prevIsChecked) => {
  //     const newIsChecked = !prevIsChecked;
  //      // Вызываем onSearch после обновления isChecked
  //     console.log(newIsChecked); // Выводим текущее значение newIsChecked
  //     return newIsChecked;
  //   });
  //   onSearch();
  // };

  const handleCheckboxChange = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    onSearch(newIsChecked); // Передаем новое значение isChecked в onSearch
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