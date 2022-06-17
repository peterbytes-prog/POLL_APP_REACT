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
import Loading from './loading';
import PollDetailPage from './poll/detail';
import { addVote, addPoll, fecthPolls, fecthCategories } from '../controller/actioncreators';


import { connect } from 'react-redux';


const mapStateToProps = state =>{
  return {
    polls:state.polls,
    users:state.users,
    categories: state.categories
  }
}
const mapDispatchToProps = dispatch => ({
  onVote: (userId, choice) => dispatch(addVote(userId, choice)),
  onCreatePoll: ( userId, question_text, choice_text,category ) => dispatch(addPoll(userId, question_text, choice_text, category)),
  fecthPolls: () => { dispatch(fecthPolls()) },
  fecthCategories: () => { dispatch(fecthCategories())}
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
  }

  componentDidMount(){

    this.props.fecthCategories();
    this.props.fecthPolls();

  }
  render(){

    const PollDetail = ({ match })=>{
      return (<PollDetailPage
                polls={this.props.polls.polls}
                pollId={match.params.pollId}
                 onVote={this.props.onVote}
                 categories={this.props.categories.categories}
                 pollsLoading = {this.props.polls.isLoading}
                 pollsErrMess = {this.props.polls.errMess}
              />)
    }
    const PollCategory = ({ match }) =>{

      let group = [];
      for(let category of this.props.categories.categories){
        let {found, ref} = depthFirst(category,parseInt(match.params.categoryid), 0, null);
        if(found){
          group = depthFirst2(found);
          break;
        }
      }
      let polls = this.props.polls.polls.filter((poll)=>group.includes(parseInt(poll.categoryid['$oid'])));
      return <PollListPage
                  polls={polls}
                  pollsLoading = {this.props.polls.isLoading}
                  pollsErrMess = {this.props.polls.errMess}
                  categories={this.props.categories.categories}
                  categoriesError = {this.props.categories.errMess}
                  categoriesLoading = {this.props.categories.isLoading}
              />
    }
    return(
      <div>
        <Header />
          <Switch>
            <Route exact path='/' component={()=> <HomePage
                                                            polls={this.props.polls.polls}
                                                            pollsLoading = {this.props.polls.isLoading}
                                                            pollsErrMess = {this.props.polls.errMess}
                                                            categories={this.props.categories.categories}
                                                            categoriesError = {this.props.categories.errMess}
                                                            categoriesLoading = {this.props.categories.isLoading}
                                                            />
                                              }
            />
            <Route exact path='/polls' component={()=> <PollListPage
                                                            polls={this.props.polls.polls}
                                                            pollsLoading = {this.props.polls.isLoading}
                                                            pollsErrMess = {this.props.polls.errMess}
                                                            categories={this.props.categories.categories}
                                                            categoriesError = {this.props.categories.errMess}
                                                            categoriesLoading = {this.props.categories.isLoading}
                                                        />
                                                  }
            />
            <Route exact path='/polls/create' component={ () => <CreatePollPage onCreatePoll={this.props.onCreatePoll} categories={this.props.categories.categories} /> } />
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
// pollsLoading = {this.props.polls.isLoading}
// pollsErrMess = {this.props.polls.errMess}


    // "react-redux-form": "^1.16.9",
    // "@fortawesome/fontawesome-svg-core": "^6.1.1",
    // "@fortawesome/free-solid-svg-icons": "^6.1.1",
    // "@fortawesome/react-fontawesome": "^0.1.18",

    // "@testing-library/jest-dom": "^5.16.4",
    // "@testing-library/react": "^13.3.0",
    // "@testing-library/user-event": "^13.5.0",
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
