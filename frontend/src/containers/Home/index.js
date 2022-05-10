import { connect } from 'react-redux';
import Home from 'src/components/Home';
import SliderArrows from 'src/components/Slider-arrows';

const mapStateToProps = (state, ownProps) => {
  return {
    settings: {
      infinite: true,
      fade: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      nextArrow: <SliderArrows />,
      prevArrow: <SliderArrows />,
    },
    themes : [
      { id: 1, name: 'toto' },
      { id: 2, name: 'titi' },
      { id: 3, name: 'tata' }
    ]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
