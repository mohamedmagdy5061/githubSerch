import React from 'react';
import { useHistory } from 'react-router-dom';
import LazyImage from './ImageLazyLoad';
import { CardModel } from '../models';

interface CardProps {
  data: CardModel;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const history = useHistory();
  const { avatar_url, login, owner } = data;
  return (
      <div className="card">
        <div className="card__avatar">
          <LazyImage src={avatar_url} />
        </div>
        <div className="card__content">
          <button
            className="card__content__name button--link"
            onClick={() => !owner && history.push(`/users/${login}`)}
          >
            {login}
          </button>
        </div>
    </div>
  );
};

export default Card;
