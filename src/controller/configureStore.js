import { createStore, combineReducers, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
// import { Reducer, initialState } from './reducer';
import { Polls } from './polls';
import { Users } from './users';
import { Categories } from './categories';

export const ConfigureStore = () =>{
  const store = createStore(combineReducers({
    polls: Polls,
    categories: Categories,
    users: Users
  }), applyMiddleware(thunk));
  return store;
}
