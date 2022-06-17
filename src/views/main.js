import React, { Component } from 'react';
// import { Button } from 'reactstrap';
import Header from './header';
import Footer from './footer';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import HomePage from './home';
import PollListPage from './poll/list';
import SignInPage from './user/login';
import SignUpPage from './user/signup';
import CreatePollPage from './poll/create';
import PollDetailPage from './poll/detail';
import { addVote, addPoll } from '../controller/actioncreators';


import { connect } from 'react-redux';
// const POLLS = [];
// const USERS = [];
const mapStateToProps = state =>{
  return {
    polls:state.polls,
    users:state.users,
    categories: state.categories
  }
}
const mapDispatchToProps = dispatch => ({
  onVote: (userId, choice) => dispatch(addVote(userId, choice)),
  onCreatePoll: ( userId, question_text, choice_text,category ) => dispatch(addPoll(userId, question_text, choice_text, category))
})
function depthFirst2(cat){
  let ref =[];
  cat.subCategories = cat.subCategories || []
  if (cat._id){
      ref.push(cat._id)
  }
  for(let other_category of cat.subCategories){
    ref =ref.concat(depthFirst2(other_category))
  }
  return ref
}
function depthFirst(cat, _find, ind=0, found=null){
  let ref = [];
  cat.subCategories = cat.subCategories || []
  if (cat._id){
    if( cat._id == _find){
      found = cat
      ref.push(cat._id)
      return {'found':found, 'ref':ref}
    }
    ref.push(cat._id)
  }
  for(let other_category of cat.subCategories){
    let res = depthFirst(other_category, _find, ind+1, found);
    ref.push(res.ref)
    found = res.found
  }
  return {'found':found, 'ref':ref}
}
class Main extends Component{
  constructor(props){
    super(props);
    // this.state = {
    //   polls: [],
    //   users: [],
    //   categories:[]
    // }
  }

  // componentDidMount(){
  //   this.setState({
  //     polls: [
  //       {
  //       "_id": {
  //         "$oid": "62a57ef296907d4e09c65252"
  //       },
  //       "question_text": "Morning",
  //       date: "2013-12-02T17:57:28.556094Z",
  //       "userid": {
  //         '_id': "62a5a17b1197d32f13894b26",
  //         'username': 'John Doe'
  //       },
  //       "choices": [
  //         {
  //           "choice_text": "Yes",
  //           "questionid": {
  //             "$oid": "62a57ef296907d4e09c65252"
  //           },
  //           "_id": {
  //             "$oid": "62a57ef296907d4e09c65254"
  //           },
  //           "votes": []
  //         },
  //         {
  //           "choice_text": "No",
  //           "questionid": {
  //             "$oid": "62a57ef296907d4e09c65252"
  //           },
  //           "_id": {
  //             "$oid": "62a57ef296907d4e09c65255"
  //           },
  //           "votes": [
  //             {
  //               "userid": {
  //                 "$oid": "62a59dd7161d4d86cbd3ae00"
  //               },
  //               "choiceid": {
  //                 "$oid": "62a57ef296907d4e09c65255"
  //               },
  //               "_id": {
  //                 "$oid": "62a5a2021197d32f13894b32"
  //               }
  //             }
  //           ]
  //         }
  //       ],
  //       "__v": 1
  //     },{
  //       "_id": {
  //         "$oid": "62a5a17b1197d32f13894b20"
  //       },
  //       "question_text": "Size of Hydrogen Atom",
  //       date: "2013-12-02T17:57:28.556094Z",
  //       "userid": {
  //         '_id': "62a5a17b1197d32f13894b20",
  //         'username': 'Jerry Pumba'
  //       },
  //       "choices": [
  //         {
  //           "choice_text": "1.01",
  //           "questionid": {
  //             "$oid": "62a5a17b1197d32f13894b20"
  //           },
  //           "_id": {
  //             "$oid": "62a5a17b1197d32f13894b22"
  //           },
  //           "votes": []
  //         },
  //         {
  //           "choice_text": "1.9E-39",
  //           "questionid": {
  //             "$oid": "62a5a17b1197d32f13894b20"
  //           },
  //           "_id": {
  //             "$oid": "62a5a17b1197d32f13894b23"
  //           },
  //           "votes": []
  //         }
  //       ],
  //       "__v": 1
  //     },
  //     {
  //       "_id": {
  //         "$oid": "62a57ef296907d4e09c65258"
  //       },
  //       "question_text": "Total official types of Pokémon",
  //       date: "2013-12-02T17:57:28.556094Z",
  //       "userid": {
  //         '_id': "62a5a17b1197d32f13894b26",
  //         'username': 'Janet Jackson'
  //       },
  //       "choices": [
  //         {
  //           "choice_text": "3",
  //           "questionid": {
  //             "$oid": "62a57ef296907d4e09c65258"
  //           },
  //           "_id": {
  //             "$oid": "62a57ef296907d4e09c65254"
  //           },
  //           "votes": [
  //
  //             {
  //               "userid": {
  //                 "$oid": "62a59dd7161d4d86cbd3ae00"
  //               },
  //               "choiceid": {
  //                 "$oid": "62a57ef296907d4e09c65255"
  //               },
  //               "_id": {
  //                 "$oid": "62a5a2021197d32f13894b32"
  //               }
  //             }
  //           ]
  //         },
  //         {
  //           "choice_text": "18",
  //           "questionid": {
  //             "$oid": "62a57ef296907d4e09c65252"
  //           },
  //           "_id": {
  //             "$oid": "62a57ef296907d4e09c65255"
  //           },
  //           "votes": [
  //             {
  //               "userid": {
  //                 "$oid": "62a59dd7161d4d86cbd3ae00"
  //               },
  //               "choiceid": {
  //                 "$oid": "62a57ef296907d4e09c65255"
  //               },
  //               "_id": {
  //                 "$oid": "62a5a2021197d32f13894b32"
  //               }
  //             },
  //             {
  //               "userid": {
  //                 "$oid": "62a59dd7161d4d86cbd3ae00"
  //               },
  //               "choiceid": {
  //                 "$oid": "62a57ef296907d4e09c65255"
  //               },
  //               "_id": {
  //                 "$oid": "62a5a2021197d32f13894b32"
  //               }
  //             },
  //             {
  //               "userid": {
  //                 "$oid": "62a59dd7161d4d86cbd3ae00"
  //               },
  //               "choiceid": {
  //                 "$oid": "62a57ef296907d4e09c65255"
  //               },
  //               "_id": {
  //                 "$oid": "62a5a2021197d32f13894b32"
  //               }
  //             }
  //           ]
  //         },
  //         {
  //           "choice_text": "15",
  //           "questionid": {
  //             "$oid": "62a57ef296907d4e09c65266"
  //           },
  //           "_id": {
  //             "$oid": "62a57ef296907d4e09c65255"
  //           },
  //           "votes": [
  //             {
  //               "userid": {
  //                 "$oid": "62a59dd7161d4d86cbd3ae00"
  //               },
  //               "choiceid": {
  //                 "$oid": "62a57ef296907d4e09c65255"
  //               },
  //               "_id": {
  //                 "$oid": "62a5a2021197d32f13894b32"
  //               }
  //             }
  //           ]
  //         }
  //       ],
  //       "__v": 1
  //     }
  //     ],
  //     users: USERS,
  //     categories:CATEGORIES
  //   });
  // }
  // componentDidUpdate(prevProps){
  //   console.log(this.state.polls, prevProps.polls, )
  //   // if(prevProps.polls !== this.state.polls){
  //   //   this.setState({
  //   //     polls: POLLS
  //   //   })
  //   // }
  //   // if(prevProps.users !== this.state.users){
  //   //   this.setState({
  //   //     users: USERS
  //   //   })
  //   // }
  //
  // }

  render(){
    const PollDetail = ({ match })=>{
      return <PollDetailPage polls={this.props.polls} pollId={match.params.pollId} onVote={this.props.onVote} categories={this.props.categories}/>
    }
    const PollCategory = ({ match }) =>{

      let group = [];
      for(let category of this.props.categories){
        let {found, ref} = depthFirst(category,parseInt(match.params.categoryid), 0, null);
        if(found){
          group = depthFirst2(found);
          break;
        }
      }
      let polls = this.props.polls.filter((poll)=>group.includes(parseInt(poll.categoryid['$oid'])));
      return <PollListPage  polls={polls} categories={this.props.categories} />
    }
    return(
      <div>
        <Header />
          <Switch>
            <Route exact path='/' component={()=> <HomePage polls={this.props.polls} categories={this.props.categories}/>} />
            <Route exact path='/polls' component={()=> <PollListPage polls={this.props.polls}  categories={this.props.categories}/>} />
            <Route exact path='/polls/create' component={ () => <CreatePollPage onCreatePoll={this.props.onCreatePoll} categories={this.props.categories} /> } />
            <Route path='/polls/category/:categoryid' component={ PollCategory } />
            <Route  path='/polls/:pollId' component={ PollDetail } />
            <Route exact path='/signin' component={ SignInPage } />
            <Route exact path='/signup' component={ SignUpPage } />
            <Redirect to='/' />
          </Switch>
        <Footer />
      </div>
    )
  }
}

    // "react-redux-form": "^1.16.9",
    // "@fortawesome/fontawesome-svg-core": "^6.1.1",
    // "@fortawesome/free-solid-svg-icons": "^6.1.1",
    // "@fortawesome/react-fontawesome": "^0.1.18",

    // "@testing-library/jest-dom": "^5.16.4",
    // "@testing-library/react": "^13.3.0",
    // "@testing-library/user-event": "^13.5.0",
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
