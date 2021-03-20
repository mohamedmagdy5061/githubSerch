import HTTP from '../../services/axiosInstance';
import { SearchOption } from '../../types';

export const fechData = (
  type: SearchOption,
  searchKeyWord: string,
  page: number = 1
) => {
  return (dispatch: any, getState: any) => {
    const { fetchedData } = getState();
    const { searchParams } = fetchedData;
    const per_page = 30;
    if (searchParams.total <= 0 && searchParams.searchKeyWord) {
      return dispatch({ type: 'NO_MORE_DATA' });
    } else {
      dispatch({ type: 'START_FETCHING' });
      const url = `/search/${type}`;
      return HTTP({
        method: 'GET',
        url: url,
        params: {
          q: searchKeyWord,
          per_page: per_page,
          page
        }
      })
        .then(({ data }) => {
          const { items, total_count } = data;
          const total = total_count - per_page * page;
          return dispatch({
            type: 'FETCH_SUCCESS',
            payload: {
              items,
              searchParams: { type, searchKeyWord, page, total: total }
            }
          });
        })
        .catch(error =>
          dispatch({ type: 'FETCH_FAILURE', payload: error.message })
        );
    }
  };
};
