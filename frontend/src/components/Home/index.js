import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import CardSoundboard from '../Card/Soundboard';
import SliderArrows from 'src/components/Slider-arrows';

import './styles.scss';

const Home = function (props) {
  const settings = {
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <SliderArrows />,
    prevArrow: <SliderArrows />,
  }

  useEffect(() => {
    props.loadSoundboardsLasts();
    props.loadSoundboardsTrending();
  }, []);

  if (props.loading) {
    return 'Chargement';
  }

  return (
    <section id="home">
      <div className="carouselContainer">
        <h2>5 derniers soundboards</h2>
        <Slider {...settings}>
          {props.listLasts.map((soundboard) => (
            <CardSoundboard 
            key={soundboard.id} 
            title={soundboard.title} 
            subtitle={soundboard.user.username} 
            info={`Nombres de sons : ${soundboard.sounds.length}`} 
            themes={soundboard.tags} 
            rating={soundboard.rating} 
            text={soundboard.description}
            url={`/profile/${soundboard.user.id}?soundboard=${soundboard.id}`}
            />
          ))}
        </Slider>
      </div>
      <div className="carouselContainer">
        <h2>Top 5</h2>
        <Slider {...settings}>
          {props.listTrending.map((soundboard) => (
            <CardSoundboard 
            key={soundboard.id} 
            title={soundboard.title} 
            subtitle={soundboard.user.username} 
            info={`Nombres de sons : ${soundboard.sounds.length}`} 
            themes={soundboard.tags} 
            rating={soundboard.rating} 
            text={soundboard.description}
            url={`/profile/${soundboard.user.id}?soundboard=${soundboard.id}`}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Home;
