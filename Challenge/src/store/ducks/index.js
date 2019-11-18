import { combineReducers } from 'redux';
import { reducer as basket } from './basket';

const reducers = combineReducers({
  basket,
});

export default reducers;
