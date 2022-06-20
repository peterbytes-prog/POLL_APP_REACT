import * as ActionTypes from './actiontypes';
import fetch from 'cross-fetch';
import { baseUrl } from '../shared/baseUrl';
import { POLLS } from '../shared/polls';
import { CATEGORIES } from '../shared/categories';


const createVoteLoading = () =>{
  return ({
    type: ActionTypes.REQUEST_VOTE
  })
}
const createVoteFailed = (message) => {
  return ({
    type: ActionTypes.REQUEST_VOTE_FAILED,
    message
  })
}
const createVoteSuccess = (response) => {
  return ({
    type: ActionTypes.REQUEST_VOTE_SUCCESS,
    _id: response._id
  })
}
export const createVote = (pollId, choiceId) => (dispatch) => {
  dispatch(createVoteLoading());
  const bearer = 'Bearer '+localStorage.getItem('token');
  fetch(baseUrl + `polls/${pollId}/choices/${choiceId}`, {
    method: 'POST',
    body:JSON.stringify({'confirm':true}),
    headers:{
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': bearer
    },
    credentials: "same-origin"

  })
  .then(response => {
    if(response.ok){
      return response
    }else{
      let error = new Error('Error '+response.status);
      error.response = response;
      throw error;
    }
  }, err => {throw err})
  .then(response => response.json())
  .then(response => {
    dispatch(createVoteSuccess(response))
    fecthPolls()(dispatch)
  })
  .catch( err => {
    dispatch(createVoteFailed(err.message));
  })
}

const createPollLoading = () => {
  return({
    type:ActionTypes.CREATE_POLL_REQUEST
  })
}
const createPollSuccess = (response) => {
  return ({
    type: ActionTypes.CREATE_POLL_SUCCESS,
    _id: response._id
  })
}
const createPollFailed = (message) => {
  return ({
    type: ActionTypes.CREATE_POLL_FAILED,
    message
  })
}
export const createPoll = (data) => (dispatch) =>{
  dispatch(createPollLoading());
  const bearer = 'Bearer '+localStorage.getItem('token');
  return fetch(baseUrl+'polls', {
    method: 'POST',
    body:JSON.stringify(data),
    headers:{
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': bearer
    },
    credentials: "same-origin"
  })
  .then(response => {
      if(response.ok){
        return response
      }else{
        let error = new Error('Error '+response.status);
        error.response = response;
        throw error;
      }
  }, err =>{
    throw err
  })
  .then( response => response.json())
  .then( response => {
      dispatch(createPollSuccess(response))
      fecthPolls()(dispatch)
    })
  .catch( err => dispatch(createPollFailed(err.message)))
}




export const fecthPolls = () => (dispatch) =>{
  dispatch(pollLoading(true));
  fetch(baseUrl + 'polls', {method: 'GET',
      dataType: 'json',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }})
  .then(polls => polls.json())
  .then(polls => {
      const withVotes = polls.map((poll)=>{
        poll.votes = poll.choices.map((c)=>c.votes.length).reduce((partialSum, a) => partialSum + a, 0);
        return poll;
      })
      return dispatch(addPolls(withVotes))
    })
  .catch(err=>dispatch(loadPollsFailed(err.message)))
}

function pollLoading(bool){
  return (
    {
      type: ActionTypes.FECTH_POLL_LOADING
    }
  )
}
function addPolls(polls){
  return ({
    type: ActionTypes.FETCHED_POLLS,
    payload:polls
  })
}
function loadPollsFailed(errMess){
  return({
    type: ActionTypes.FECTH_POLL_FAILED,
    payload: errMess
  })
}

// categories
export const fecthCategories = () => (dispatch) =>{
  dispatch(categoriesLoading(true));
  fetch(baseUrl+'categories',{
    method:'GET'
  })
  .then(result => result.json())
  .then(result => dispatch(addCATEGORIES(result)))
  .catch(error => dispatch(loadCategoriesFailed(error.message)))
}
const categoriesLoading = () =>{
  return ({
    type: ActionTypes.FECTH_CATEGORIES_LOADING
  })
}
const addCATEGORIES = (categories) => {
  return ({
    type: ActionTypes.FECTHED_CATEGORIES,
    payload:categories
  })
}
const loadCategoriesFailed  = (errMess) => {
  return ({
    type: ActionTypes.FECTH_CATEGORIES_FAILED,
    payload: errMess
  })
}

//auth Logining
export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds
  }
}

export  const recieveLogin = ( response ) =>{
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token
  }
}

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILED,
    message
  }
}

export const loginUser = ( creds ) => (dispatch) => {
  dispatch(requestLogin(creds))
  return fetch(baseUrl+'users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  })
  .then(response => {
      if (response.ok){
        return response;
      }else{
        var error = new Error('Error '+response.status)
        error.response = response;
        throw error
      }
    }, error => {
      throw error;
    })
  .then(response => response.json())
  .then( response => {
    if( response.success ){
        localStorage.setItem('token', response.token);
        localStorage.setItem('creds', JSON.stringify(creds));
        dispatch(recieveLogin(response));
    }
    else{
        var error = new Error('Error '+ response.status);
        error.response = response;
        throw error;
    }
  })
  .catch( error => dispatch(loginError(error.message)))
}

// Auth logout
export const requestLogout = () =>{
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  }
}
export const logoutUser = () => (dispatch) => {
  dispatch({type: ActionTypes.LOGOUT_REQUEST});
  localStorage.clear()
  dispatch({type: ActionTypes.LOGOUT_SUCCESS});
}


// SIGNUP's
export const requestSignup = () => {
  return ({
    type:  ActionTypes.SIGNUP_REQUEST,
  })
}
export const recieveSignup = ( response ) => {
  return ({
    type:  ActionTypes.SIGNUP_SUCCESS
  })
}
export const signUpError = ( message ) => {
  return ({
    type: ActionTypes.SIGNUP_FAILED,
    message
  })
}

export const signupUser = ( creds ) => ( dispatch ) => {
  dispatch(requestSignup());

  fetch(baseUrl + 'users/create', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  })
  .then(response => {
    if(response.ok){
      return response;
    }else{
      let error = new Error('Error '+response.status);
      error.response = response;
      throw error;
    }
  }, err => {
    throw err
  })
  .then(response => response.json())
  .then(response =>{
    if(response.success){
        dispatch(recieveSignup(response));
    }else{
      var error = new Error('Error '+ response.status);
      error.response = response;
      throw error;
    }
  })
  .catch( error => dispatch(signUpError(error.message)))
}
