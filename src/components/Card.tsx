import React from 'react';
import LazyImage from './ImageLazyLoad';
import { CardModel } from '../models';
import { Link } from 'react-router-dom';

interface CardProps {
  data: CardModel;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const { avatar_url, login, owner, full_name } = data;
  return (
    <Link to={!owner ? `/users/${login}` : `/repo/${full_name}`}>
      <div className="card">
        <div className="card__avatar">
          <LazyImage src={avatar_url} />
        </div>
        <div className="card__content">
          <button className="card__content__name button--link">{login}</button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
