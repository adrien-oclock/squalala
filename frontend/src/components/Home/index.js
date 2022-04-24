import React from 'react';

import Slider from 'react-slick';

import './styles.scss';

const Home = function () {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <section id="home">
      <div className="carouselContainer">
        <h2>5 derniers soundboards</h2>
        <Slider {...settings}>
          <div className="carouselElement">
            <p className="title">Tototo</p>
            <p className="author">Adrien</p>
            <p className="theme">Toto - Tata - Titi</p>
            <div className="rating">
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star" />
              <span className="fa fa-star" />
            </div>
          </div>
          <div className="carouselElement">
            <p className="title">Tatata</p>
            <p className="author">Adrien</p>
            <p className="theme">Toto - Tata - Titi</p>
            <div className="rating">
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star" />
              <span className="fa fa-star" />
            </div>
          </div>
          <div className="carouselElement">
            <p className="title">Tititi</p>
            <p className="author">Adrien</p>
            <p className="theme">Toto - Tata - Titi</p>
            <div className="rating">
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star" />
              <span className="fa fa-star" />
            </div>
          </div>
        </Slider>
      </div>
      <div className="carouselContainer">
        <h2>Top 5</h2>
        <Slider>
          <div className="carouselElement">
            <p className="title">Tototo</p>
            <p className="author">Adrien</p>
            <p className="theme">Toto - Tata - Titi</p>
            <div className="rating">
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star" />
              <span className="fa fa-star" />
            </div>
          </div>
          <div className="carouselElement">
            <p className="title">Tatata</p>
            <p className="author">Adrien</p>
            <p className="theme">Toto - Tata - Titi</p>
            <div className="rating">
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star" />
              <span className="fa fa-star" />
            </div>
          </div>
          <div className="carouselElement">
            <p className="title">Tititi</p>
            <p className="author">Adrien</p>
            <p className="theme">Toto - Tata - Titi</p>
            <div className="rating">
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star" />
              <span className="fa fa-star" />
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Home;
