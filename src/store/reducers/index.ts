import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import DataFetchReducer from './DataFetchReducer';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['fetchedData']
};

const rootReducer = combineReducers({
  fetchedData: DataFetchReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer<any, any>(persistConfig, rootReducer);
