import { compose, createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';

import { rootReducer} from "./root-reducer";

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

const middlewares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);
const composeEnhancer = (
    process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
