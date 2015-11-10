import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import promisesMiddleware from '../middlewares/promise';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(promisesMiddleware, logger)(createStore);

const store = createStoreWithMiddleware(reducer);

export default store;
