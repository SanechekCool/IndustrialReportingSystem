import { combineReducers } from 'redux';
import user from './auth/index';
import items from './items';

const reducers = combineReducers({
  user,
  items
});

export type IReduxState = ReturnType<typeof reducers>;

export default reducers;
