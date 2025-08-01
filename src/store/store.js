import { compose, createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './root-reducer'
import { thunk } from 'redux-thunk'



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}


const persistedReducer = persistReducer(persistConfig, rootReducer);

const isProduction = import.meta.env.MODE === 'production';

const middleWares = [ !isProduction && logger, thunk].filter(
    Boolean
);


const composeEnhancer = (import.meta.env.MODE!== 'production' && 
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);