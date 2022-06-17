import { createStore, combineReducers } from 'redux';
// import { Reducer, initialState } from './reducer';
import { Polls } from './polls';
import { Users } from './users';
import { Categories } from './categories';

export const ConfigureStore = () =>{
  const store = createStore(combineReducers({
    polls: Polls,
    categories: Categories,
    users: Users
  }));
  return store;
}
