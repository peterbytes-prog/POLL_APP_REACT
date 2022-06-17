import * as ActionTypes from './actiontypes';

export const Categories = (state={
      isLoading: false,
      errMess: null,
      categories: []
    }, action) =>{
  switch (action.type) {
    case(ActionTypes.FECTH_CATEGORIES_LOADING):
      return {...state, isLoading:true, categories:[], errMess:null}
    case(ActionTypes.FECTH_CATEGORIES_FAILED):
      return {...state, isLoading:false, categories:[], errMess:action.payload}
    case(ActionTypes.FECTHED_CATEGORIES):
      return {...state, isLoading:false, categories:action.payload, errMess:null}
    default:
      return state;
  }
}
