import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import MovieImg from '../../../images/movie.png';

function MoviesCard() {
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();

  const changeButtonBg = location.pathname === '/saved-movies';

  function handleSaveClick() {
    setIsSaved(!isSaved);
  }

  return (
    <li className="movie">
      <img src={MovieImg} alt="Изображение фильма" className="movie__img" />
      <div className="movie__container">
        <div className="movie__caption">
          <h2 className="movie__title">33 слова о дизайне</h2>
          <p className="movie__duration">1ч 42м</p>
        </div>
        <button type="button" className={`movie__save-btn ${isSaved ? 'movie__save-btn_active' : ''} ${changeButtonBg ? 'movie__delete-btn' : ''}`} onClick={handleSaveClick} />
      </div>
    </li>
  )
}

export default MoviesCard;