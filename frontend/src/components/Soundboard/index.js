/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation, NavLink } from 'react-router-dom';
import { getFirstSoundboardId, getSoundboardById } from 'src/utils';
import CardSound from '../Card/Sound';

import './styles.scss';

const Soundboard = function (props) {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    props.loadUser(id);
  }, [location]);

  if (props.loading || (props.user && props.user.id != id)) {
    return 'Chargement';
  }

  const soundboardId = searchParams.get('soundboard') ? parseInt(searchParams.get('soundboard')) : getFirstSoundboardId(props.user.soundboard);
  const soundboard = getSoundboardById(props.user.soundboard, soundboardId);

  return (
    <div className="profile">
      <section id="author">
        <h4>{props.user.username}</h4>
        <nav>
          <ul>
            {props.user.soundboard.map((soundboard) => (
              <li key={soundboard.id} className={`btn ${soundboard.id === soundboardId ? 'btn-primary' : 'btn-secondary'}`}>
                <NavLink to={`/profile/${props.user.id}?soundboard=${soundboard.id}`}>{soundboard.title}</NavLink>
              </li>
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
