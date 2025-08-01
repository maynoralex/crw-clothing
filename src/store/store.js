import { configureStore } from '@reduxjs/toolkit'
import { logger } from 'redux-logger'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import { rootReducer } from './root-reducer'



// const persistConfig = {
//     key: 'root',
//     storage,
//     blacklist: ['user']
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [import.meta.env.MODE !== 'production' && logger].filter(
    Boolean
);



export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(middleWares)
});


//export const persistor = persistStore(store);