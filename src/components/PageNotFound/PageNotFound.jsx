import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section className="page-not-found">
      <h2 className="page-not-found__title">404</h2>
      <p className="page-not-found__subtitle">Страница не найдена</p>
      <button className="page-not-found__btn" onClick={goBack} >Назад</button>
    </section>
  )
}

export default PageNotFound;