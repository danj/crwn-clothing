import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';

import { rootReducer} from "./root-reducer";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./root-saga";

// const logger = (store) => (next) => (action) => {
//     if (!action.type) {
//         return next(action);
//     }
//
//     console.log(`Action: ${action.type} `, action.payload);
//     console.log('Current state: ', store.getState());
//
//     next(action);
//
//     console.log('New state: ', store.getState());
// }

const cartTransform = createTransform(
    // transform state on its way to being serialized and persisted.
    (inboundState, key) => {
        return { ...inboundState, items: Object.fromEntries(inboundState.items) };
    },
    // transform state being rehydrated
    (outboundState, key) => {
        // convert mySet back to a Set.
        return { ...outboundState, items: new Map(Object.entries(outboundState.items).map(
                ((pair) => [parseInt(pair[0]), pair[1]]))) }
    },
    // define which reducers this transform gets called for.
    { whitelist: ['cart'] }
);

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
    transforms: [cartTransform]
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
    process.env.NODE_ENV !== 'production' && logger,
    // thunk
    sagaMiddleware
].filter(Boolean);

const composeEnhancer = (
    process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));


export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
