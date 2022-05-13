/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getSounboardById } from 'src/utils';
import CardSound from '../Card/Sound';

import './styles.scss';

const Soundboard = function (props) {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    props.loadUser(id);
  }, []);

  if (props.loading) {
    return 'Chargement';
  }

  const soundboard = getSounboardById(props.user.soundboard, searchParams.get('soundboard'));

  return (
    <div className="profile">
      <section id="author">
        <h4>{props.user.username}</h4>
        <nav>
          <ul>
            {props.user.soundboard.map((soundboard) => (
              <li key={soundboard.id} className={`btn ${soundboard.id === soundboard.id ? 'btn-primary' : 'btn-secondary'}`}><a href="#">{soundboard.title}</a></li>
            ))}
          </ul>
        </nav>
      </section>
      <section id="soundboard">
        {soundboard.sounds.map((sound) => (
          <CardSound key={sound.id} id={sound.id} title={sound.title} text={sound.description} />
        ))}
        {props.currentUser.id === props.user.id
          ? <CardSound key="sound-add" add />
          : <CardSound key="sound-rate" rating={soundboard.rating} />
        }
      </section>
    </div>
  );
};

export default Soundboard;
