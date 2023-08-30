import React from 'react';
import './AboutMe.css';
import AvatarImg from '../../../images/avatar.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__info-title">Павел</h3>
          <p className="about-me__info-subtitle">Фронтенд-разработчик, 33 года</p>
          <p className="about-me__info-description">Я родился и живу в г. Орёл, закончил факультет экономики ОГУ. У меня есть жена и двое детей. Я люблю слушать музыку, а ещё увлекаюсь спортом. Нравится заниматься фронтенд-разработкой. С 2011 года параллельно с работой бухгалтером начал поддерживать сайт организации. Сейчас планирую полностью уйти в разработку сайтов и приложений.</p>
          <a href="https://github.com/elicrock" className="about-me__link" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img src={AvatarImg} className="about-me__avatar-img" alt="Аватар" />
      </div>
    </section>
  )
}

export default AboutMe;