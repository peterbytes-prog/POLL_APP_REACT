import React, { Component } from 'react';
// import { Button } from 'reactstrap';
import Header from './header';
import Footer from './footer';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import HomePage from './home';
import PollListPage from './poll/list';
import { connect } from 'react-redux';

import PollDetailPage from './poll/detail';
// const POLLS = [];
// const USERS = [];
const mapStateToProps = state =>{
  return {
    polls:state.polls,
    users:state.users,
    categories: state.categories
  }
}
class Main extends Component{
  constructor(props){
    super(props);
    // this.state = {
    //   polls: [],
    //   users: [],
    //   categories:[]
    // }
    this.onVote = this.onVote.bind(this);
  }
  onVote(choice){
    let questions = this.props.polls;
    const questionid = choice.questionid['$oid'];
    const choiceid = choice._id['$oid'];
    const new_vote = {
      "userid": {
        "$oid": "62a59dd7161d4d86cbd3ae00"
      },
      "choiceid": {
        "$oid": choiceid
      },
      "_id": {
        "$oid": "62a5a2021197d32f13894b00"
      }
    };
    let q = this.props.polls.filter((poll)=> poll._id['$oid'] === questionid);

    if(q.length>=0){
      const questionInd = this.props.polls.indexOf(q[0]);
      let question = q[0];
      let c = question.choices.filter((choice)=>choice._id['$oid'] === choiceid);
      if(c.length>=0){
        let choiceInd = question.choices.indexOf(c[0]);
        let choice =c[0];
        choice.votes.push(new_vote);
        question.choices[choiceInd] = choice;
        questions[questionInd] = question;
        this.setState({
          polls:questions
        })
      }
    }
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
      return <PollDetailPage polls={this.props.polls} pollId={match.params.pollId} onVote={this.onVote}/>
    }
    return(
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={()=> <HomePage polls={this.props.polls} categories={this.props.categories}/>} />
          <Route exact path='/polls' component={()=> <PollListPage polls={this.props.polls}  categories={this.props.categories}/>} />
          <Route path='/polls/:pollId' component={ PollDetail } />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    )
  }
}


export default withRouter(connect(mapStateToProps)(Main));
