import * as ActionTypes from './actiontypes';


export const SignUP = (state={
  isLoading: false,
  errMess:null,
  signedUp:false,
}, action) => {
  switch (action.type) {
    case ActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading:true,
        errMess:null,
        signedUp:false
      }
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading:false,
        errMess:null,
        signedUp:true
      }
    case ActionTypes.SIGNUP_FAILED:
      return {
        ...state,
        isLoading:false,
        errMess:action.message,
        signedUp:false
      }
    default:
      return state
  }
}
