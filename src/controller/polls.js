// import { POLLS } from '../shared/polls';
import * as ActionTypes from './actiontypes';

const resolveAddPoll = (state, payload) => {
  const { userId, question_text, choice_text, category } = payload;
  const q_id = (state.polls.length).toString();
  const new_poll = {
  "_id": {
    "$oid": q_id
  },
  "question_text": question_text,
  date: "2013-12-02T17:57:28.556094Z",
  "userid": {
    '_id': userId,
    'username': 'John Doe'
  },
  "categoryid": {
    "$oid": parseInt(category._id)
  },
  "choices": choice_text.map((choice, ind)=>(
    {
      "choice_text": choice,
      "questionid": {
        "$oid": q_id
      },
      "_id": {
        "$oid": (ind).toString()
      },
      "votes": []
    }) )
  }

  return new_poll
}
const resolveAddVote = (state, payload) =>{
  const { userId, choice } = payload;
  let questions = state.polls;
  let choiceInd = null;
  let questionInd = null;
  for (let q in questions){
    let question = questions[q];
    if (question._id['$oid'] === choice.questionid['$oid']){
      questionInd = q;
      for(let c in question.choices){
        let _choice = question.choices[c];
        if(choice._id['$oid'] === _choice._id['$oid']){
          choiceInd = c;
          break;
        }
      }
      break
    }
  }
  if (choiceInd!==null && questionInd!==null){
    const new_vote = {
      "userid": {
        "$oid": userId
      },
      "choiceid": {
        "$oid": choice._id['$oid']
      },
      "_id": {
        "$oid": choice.votes.length
      }
    };
    choice.votes.push(new_vote);
    questions[questionInd].choices[choiceInd] = choice;
    // console.log(questions);
    return questions
  }else{
    return questions
  }
}
export const Polls = (state = {
  isLoading: false,
  errMess: null,
  polls: []
}, action) =>{
  switch (action.type) {
    case (ActionTypes.FETCHED_POLLS):
      return { ...state, isLoading:false, errMess:null, polls:action.payload}
    case (ActionTypes.FECTH_POLL_LOADING):
      return { ...state, isLoading:true, errMess:null, polls:[]};
    case (ActionTypes.FECTH_POLL_FAILED):
      return { ...state, isLoading:false, errMess:action.payload, polls:[]}
    case (ActionTypes.ADD_VOTE):
      const resolvedvote = resolveAddVote(state, action.payload);
      return { ...state, polls:resolvedvote}
    case (ActionTypes.ADD_POLL):
      const resolvedpoll = state.polls.concat(resolveAddPoll(state, action.payload));
      return { ...state, polls:resolvedpoll}
    default:
      return state;
  }
}
