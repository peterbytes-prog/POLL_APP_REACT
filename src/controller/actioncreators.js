import * as ActionTypes from './actiontypes';
import { POLLS } from '../shared/polls';
import { CATEGORIES } from '../shared/categories';


export const addVote = (userId, choice) =>{
  return {
    type: ActionTypes.ADD_VOTE,
    payload: {
      userId: userId,
      choice: choice
    }
  }
}

export const addPoll = (userId, question_text, choice_text, category) =>{

  return {
    type: ActionTypes.ADD_POLL,
    payload:{
      userId: userId,
      question_text: question_text,
      choice_text: choice_text,
      category:category
    }
  }
}
export const fecthPolls = () => (dispatch) =>{
  dispatch(pollLoading(true));
  setTimeout(()=>{
    dispatch(addPolls(POLLS));
  }, 2000)
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
  setTimeout(()=>{
    dispatch(addCATEGORIES(CATEGORIES));
  }, 1000)
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
