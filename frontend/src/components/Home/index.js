import React from 'react';

import Slider from 'react-slick';
import SliderArrows from '../Slider-arrows';

import './styles.scss';

const Home = function () {
  const settings = {
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <SliderArrows />,
    prevArrow: <SliderArrows />,
  };

  return (
    <section id="home">
      <div className="carouselContainer">
        <h2>5 derniers soundboards</h2>
        <Slider {...settings}>
          <div className="carouselElement">
            <div className="carouselContent">
              <p className="title">Tototo</p>
              <p className="author">Adrien</p>
              <p className="theme">Toto - Tata - Titi</p>
              <p className="rating">
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star" />
                <span className="fa fa-star" />
              </p>
            </div>
          </div>
          <div className="carouselElement">
            <div className="carouselContent">
              <p className="title">Tatata</p>
              <p className="author">Adrien</p>
              <p className="theme">Toto - Tata - Titi</p>
              <p className="rating">
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star" />
                <span className="fa fa-star" />
              </p>
            </div>
          </div>
          <div className="carouselElement">
            <div className="carouselContent">
              <p className="title">Tititi</p>
              <p className="author">Adrien</p>
              <p className="theme">Toto - Tata - Titi</p>
              <p className="rating">
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star" />
                <span className="fa fa-star" />
              </p>
            </div>
          </div>
        </Slider>
      </div>
      <div className="carouselContainer">
        <h2>Top 5</h2>
        <Slider {...settings}>
          <div className="carouselElement">
            <div className="carouselContent">
              <p className="title">Tototo</p>
              <p className="author">Adrien</p>
              <p className="theme">Toto - Tata - Titi</p>
              <p className="rating">
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star" />
                <span className="fa fa-star" />
              </p>
            </div>
          </div>
          <div className="carouselElement">
            <div className="carouselContent">
              <p className="title">Tatata</p>
              <p className="author">Adrien</p>
              <p className="theme">Toto - Tata - Titi</p>
              <p className="rating">
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star" />
                <span className="fa fa-star" />
              </p>
            </div>
          </div>
          <div className="carouselElement">
            <div className="carouselContent">
              <p className="title">Tititi</p>
              <p className="author">Adrien</p>
              <p className="theme">Toto - Tata - Titi</p>
              <p className="rating">
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star checked" />
                <span className="fa fa-star" />
                <span className="fa fa-star" />
              </p>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Home;
