import React from 'react';
import NotFound from '../assets/images/404.png';
import { useHistory } from 'react-router-dom';

function PageNotFound() {
  const history = useHistory();

  return (
    <div className="pageNotFound">
      <h1>Ooooops!</h1>
      <img src={NotFound} alt="NotFound" className="d" />
      <p>
        The page you are looking for does not exist. But you can click the
        button below to go back to the homepage.
      </p>
      <button className="big-button" onClick={() => history.push(`/`)}>
        Back to HOME
      </button>
    </div>
  );
}

export default PageNotFound;
