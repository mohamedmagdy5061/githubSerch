import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducers from './reducers';

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  reducers,
  /* preloadedState, */ composeEnhancers(applyMiddleware(ReduxThunk))
);
const persistor = persistStore(store);

export { store, persistor };
