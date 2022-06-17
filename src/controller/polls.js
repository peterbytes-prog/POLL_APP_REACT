import { POLLS } from '../shared/polls';
import * as ActionTypes from './actiontypes';

const resolveAddPoll = (state, payload) => {
  console.log('payload',payload);
  const { userId, question_text, choice_text, category } = payload;
  const q_id = (state.length).toString();
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
  let questions = state;
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
    return state
  }
}
export const Polls = (state = POLLS, action) =>{
  switch (action.type) {
    case (ActionTypes.ADD_VOTE):
      const resolvedvote = resolveAddVote(state, action.payload);
      return [].concat(resolvedvote)
    case (ActionTypes.ADD_POLL):
    console.log('b4', action.payload );
      const resolvedpoll = resolveAddPoll(state, action.payload);
      return state.concat(resolvedpoll)
    default:
      return state;
  }
}
