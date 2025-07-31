import { compose, createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './root-reducer'
//import { thunk } from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const isProduction = import.meta.env.MODE === 'production';

const middleWares = [ !isProduction && logger, sagaMiddleware].filter(
    Boolean
);


const composeEnhancer = (import.meta.env.MODE!== 'production' && 
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);