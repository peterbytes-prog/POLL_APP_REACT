import { createStore, combineReducers, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
// import { Reducer, initialState } from './reducer';
import { Polls } from './polls';
import { Users } from './users';
import { Categories } from './categories';
import { Auth } from './auth.js'
import { SignUP } from './signup';

export const ConfigureStore = () =>{
  const store = createStore(combineReducers({
    polls: Polls,
    categories: Categories,
    user: Auth,
    signup: SignUP
  }), applyMiddleware(thunk));
  return store;
}
