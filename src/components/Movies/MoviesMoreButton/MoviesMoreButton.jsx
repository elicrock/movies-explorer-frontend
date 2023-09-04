import React from 'react';
import './MoviesMoreButton.css';

function MoviesMoreButton({ loadMore }) {
  return (
    <section className="moives__more">
      <button className="moives__more-btn" type="button" onClick={loadMore}>Ещё</button>
    </section>
  )
}

export default MoviesMoreButton;