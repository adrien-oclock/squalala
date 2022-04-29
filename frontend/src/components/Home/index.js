import React from 'react';

import Slider from 'react-slick';
import SliderArrows from '../Slider-arrows';
import CardSoundboard from '../Card/Soundboard';

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

  const themes = [{ id: 1, name: 'toto' }, { id: 2, name: 'titi' }, { id: 3, name: 'tata' }];

  return (
    <section id="home">
      <div className="carouselContainer">
        <h2>5 derniers soundboards</h2>
        <Slider {...settings}>
          <CardSoundboard key={1} title="tata" subtitle="Adrien" themes={themes} rating={4} />
          <CardSoundboard key={2} title="tutu" subtitle="Squalala" themes={themes} rating={2} />
          <CardSoundboard key={3} title="titi" subtitle="Oclock" themes={themes} rating={1} />
          <CardSoundboard key={4} title="toto" subtitle="Michel" themes={themes} rating={5} />
          <CardSoundboard key={5} title="tyty" subtitle="Torink" themes={themes} rating={3} />
        </Slider>
      </div>
      <div className="carouselContainer">
        <h2>Top 5</h2>
        <Slider {...settings}>
          <CardSoundboard key={6} title="tata" subtitle="Adrien" themes={themes} rating={4} />
          <CardSoundboard key={7} title="tutu" subtitle="Squalala" themes={themes} rating={2} />
          <CardSoundboard key={8} title="titi" subtitle="Oclock" themes={themes} rating={1} />
          <CardSoundboard key={9} title="toto" subtitle="Michel" themes={themes} rating={5} />
          <CardSoundboard key={10} title="tyty" subtitle="Torink" themes={themes} rating={3} />
        </Slider>
      </div>
    </section>
  );
};

export default Home;
