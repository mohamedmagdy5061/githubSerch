import { SearchParams, InitalState, Action } from '../../types';

interface DataState {
  data: object[];
  isLoading: boolean;
  isError: string;
  searchParams: SearchParams;
  noMoreData: boolean;
}

const INITAL_STATE: InitalState = {
  data: [],
  searchParams: { type: 'users', searchKeyWord: '', page: 1, total: 0 },
  isLoading: false,
  isError: '',
  noMoreData: false
};

export const DataFetchReducer = (
  state: DataState = INITAL_STATE,
  action: Action
) => {
  switch (action.type) {
    case 'START_FETCHING':
      return {
        ...state,
        isLoading: true,
        isError: ''
      };
    case 'FETCH_SUCCESS':
      const data = [...state.data, ...action.payload.items];
      return {
        ...state,
        isLoading: false,
        isError: '',
        searchParams: { ...action.payload.searchParams },
        data
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: action.payload
      };
    case 'RESET_FETCHIN':
      return INITAL_STATE;

    case 'NO_MORE_DATA':
      return {
        ...state,
        noMoreData: true
      };

    default:
      return state;
  }
};

export default DataFetchReducer;
