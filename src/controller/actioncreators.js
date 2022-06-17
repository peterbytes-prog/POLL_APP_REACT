import * as ActionTypes from './actiontypes';


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
  console.log('action creater', userId, question_text, choice_text, category);
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
