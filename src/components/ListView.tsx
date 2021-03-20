import React from 'react';
import Card from './Card';
import { RootStateOrAny, useSelector } from 'react-redux';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { css } from '@emotion/core';
import { CardModel } from '../models';

const override = css`
  position: absolute;
  right: 50%;
  bottom: 20px;
  text-align: center;
`;
interface ListProps {
  dataList: CardModel[];
}

const ListView: React.FC<ListProps> = ({ dataList }): JSX.Element => {
  const { isLoading, noMoreData } = useSelector(
    (state: RootStateOrAny) => state.fetchedData
  );

  return (
    <div className="listView__wrapper">
      {dataList.length
        ? dataList.map((item: any, index: number) => (
            <Card key={index} data={new CardModel(item)} />
          ))
        : null}

      <div className="listView__loading">
        {isLoading && (
          <PropagateLoader
            color={'#f64e60'}
            loading={true}
            css={override}
            size={15}
          />
        )}
      </div>

      {noMoreData && <span className="listView__NoMore">No more</span>}
    </div>
  );
};

export default ListView;
