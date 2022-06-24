// import { POLLS } from '../shared/polls';
import * as ActionTypes from './actiontypes';

export const Polls = (state = {
  isLoading: false,
  errMess: null,
  polls: [],
  create:{
    isLoading:false,
    errMess: null,
    _id: null
  },
  vote:{
    isLoading:false,
    errMess: null,
    _id: null
  }
}, action) =>{
  switch (action.type) {
    case (ActionTypes.FETCHED_POLLS):
      return { ...state, isLoading:false, errMess:null, polls:action.payload}
    case (ActionTypes.FECTH_POLL_LOADING):
      return { ...state, isLoading:true, errMess:null, polls:[]};
    case (ActionTypes.FECTH_POLL_FAILED):
      return { ...state, isLoading:false, errMess:action.payload, polls:[]}
    case (ActionTypes.CREATE_POLL_REQUEST):
      return {
        ...state,
        create: {
                  ...state.create,
                  isLoading:true,
                  errMess: null,
                  _id: null
                }
      }
      break;
    case (ActionTypes.CREATE_POLL_FAILED):
      return {
        ...state,
        create: {
                  ...state.create,
                  isLoading:false,
                  errMess: action.message,
                  _id: null
                }
      }
      break;
    case (ActionTypes.CREATE_POLL_SUCCESS):
      return {
        ...state,
        create: {
                  ...state.create,
                  isLoading:false,
                  errMess: null,
                  _id: action._id
                }
      }
      break;

    case (ActionTypes.REQUEST_VOTE):
      return {
        ...state,
        vote: {
                  ...state.vote,
                  isLoading:true,
                  errMess: null,
                  _id: null
                }
      }
      break
    case (ActionTypes.REQUEST_VOTE_FAILED):
      return {
        ...state,
        vote: {
                  ...state.vote,
                  isLoading:false,
                  errMess: action.message,
                  _id: null
                }
      }
      break
    case (ActionTypes.REQUEST_VOTE_SUCCESS):
      return {
        ...state,
        vote: {
                  ...state.vote,
                  isLoading:false,
                  errMess: null,
                  _id: action._id
                }
      }
      break
    default:
      return state;
  }
}
