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

const middlewares = [logger];
const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
