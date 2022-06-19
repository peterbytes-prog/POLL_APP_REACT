import * as ActionTypes from './actiontypes';


export const Auth = (state={
  isLoading: false,
  errMess:null,
  isAuthenticated:localStorage.getItem('token')?true:false,
  token:localStorage.getItem('token'),
  user:localStorage.getItem('creds')?JSON.parse(localStorage.getItem('creds')):null,
}, action) =>{
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {...state,
                isLoading:true,
                isAuthenticated:false,
                user: action.creds
              }
      break;
    case ActionTypes.LOGIN_SUCCESS:
      return {...state,
                isLoading:false,
                errMess:null,
                isAuthenticated:true,
                user:JSON.parse(localStorage.getItem('creds')),
                token:action.token
              }
      break;
    case ActionTypes.LOGIN_FAILED:
      return {...state,
                isLoading:false,
                errMess:action.message,
                isAuthenticated:false
              }
      break;
    case ActionTypes.LOGOUT_REQUEST:
      return {...state,
                isLoading:true,
                isAuthenticated:true
              }
      break;
    case ActionTypes.LOGOUT_SUCCESS:
      localStorage.clear();
      return {...state,
                isLoading:false,
                errMess:null,
                isAuthenticated:false,
                token:null,
                user:null
              }
      break;
    case ActionTypes.LOGOUT_FAILED:
          break;
    default:
      return state;
  }
}
