import React, { useEffect } from 'react';
import ListView from '../components/ListView';
import SearchBox from '../components/SearchBox';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { fechData } from '../store/actions/DataFetchActions';
import useScroll from '../hooks/useScroll';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const scrollPosition = useScroll();
  const { data = [], searchParams } = useSelector(
    (state: RootStateOrAny) => state.fetchedData
  );

  useEffect(() => {
    const { type, searchKeyWord, page } = searchParams;
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    if (((window.innerHeight + scrollPosition) == docHeight) && searchKeyWord) {
      dispatch(fechData(type, searchKeyWord, page + 1));
    }
  }, [scrollPosition]);

  return (
    <div className={`${!data.length && 'homeView'}`}>
      <SearchBox />
      <ListView dataList={data} />
    </div>
  );
};

export default HomePage;
