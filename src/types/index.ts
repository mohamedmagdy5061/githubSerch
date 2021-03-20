export type SearchOption = 'users' | 'repositories';
export type SearchParams = {
  type: SearchOption;
  searchKeyWord: string;
  page: number;
  total: number;
};

export type InitalState<T = any> = {
  data: T[];
  searchParams: SearchParams;
  isLoading: boolean;
  isError: string;
  noMoreData: boolean
};

export type ReducerTypes =
  | 'START_FETCHING'
  | 'FETCH_SUCCESS'
  | 'FETCH_FAILURE'
  | 'RESET_FETCHIN'
  | 'NO_MORE_DATA';

export type ReducerPayload<T = any> = {
  items: T[];
  searchParams: SearchParams;
};

export type Action = {
  type: ReducerTypes;
  payload: ReducerPayload;
};
