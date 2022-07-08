import { compose, createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { rootReducer} from "./root-reducer";
import createSagaMiddleware from 'redux-saga';
// import {rootSaga} from "./root-saga";

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

//const persistedReducedur = persistReducder(persistConfig, rootReducer);

// const sagaMiddleware = createSagaMiddleware();

const middlewares = [
    process.env.NODE_ENV !== 'production' && logger,
    thunk
    // sagaMiddleware
].filter(Boolean);

const composeEnhancer = (
    process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));


export const store = createStore(rootReducer, undefined, composedEnhancers);

// sagaMiddleware.run(rootSaga);
