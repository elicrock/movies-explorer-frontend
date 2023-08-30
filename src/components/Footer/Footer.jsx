import React from 'react';
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">&copy;&nbsp;{(new Date().getFullYear())}</p>
        <ul className="footer__list">
          <li><a href="https://practicum.yandex.ru" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
          <li><a href="https://github.com/elicrock" className="footer__link" target="_blank" rel="noreferrer">Github</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;