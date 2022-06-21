import React from 'react';
import { Card, CardTitle, CardBody, Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';
// import PollMediaCard from './pollcard';
import { Link } from 'react-router-dom';
import RenderCardPolls from './pollcardgroup';
import { getCategoryParentFromTree } from '../../logic.js';
import Loading from '../loading';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



function RenderChoice({votes, choice, onVote, user}){
  let opacity = {
    backgroundColor: `rgba(106, 90, 205, ${(((choice.votes.length/votes)||0))})`
  }
  const handleVote = () =>{
    if(!user.isAuthenticated){
      alert('Login Required');
      return
    }
    onVote(choice.question, choice._id);
  }
  let voted = null;
  let voters = choice.votes.map((e)=>e.user);

  if( user.isAuthenticated && voters.includes(user.user._id)){
    voted = <FontAwesomeIcon className='text-white' style={{'position':'absolute','right':'0%', fontSize:'1.5rem', borderRadius:'50%', backgroundColor:'purple'}} icon={faCheck} />
  }
  return (
    <li style={{border:'none'}} className='list-group-item' >
      { voted }
      <div  className='choice'>
        <div style={{'borderRadius':'50%', width:'3em', height:'3em', 'display':'flex', ...opacity}} className='mr-2 border border-secondary'>
          <p style={{display:'block', margin:'auto'}}>{parseInt((choice.votes.length/votes)*100||0)}%</p>
        </div>
        <div style={{...opacity}} onClick={ handleVote } className='border border-secondary d-flex'>
            <p style={{display:'block', margin:'auto'}}> { choice.choice_text }</p>
        </div>
      </div>
    </li>
  )
}
function PollDetailPage({polls, pollId, onVote, categories, pollsLoading, pollsErrMess, user}){

  if (pollsLoading || polls.length===0){
    return <Loading />
  }
  let poll = polls.filter((poll)=>poll._id === pollId);
  poll = poll.length > 0 ? poll[0] : null;
  const votes = poll ? poll.choices.reduce((prev, cur)=>prev + cur.votes.length, 0) : 0;
  const choices = poll ? poll.choices.map((choice) => <RenderChoice key={choice._id} votes={votes} choice={choice} onVote={onVote} user={user}/>) : null;

  const pollIndex = polls.indexOf(poll);


  const pollUserSuggestion = polls.filter((_poll,ind)=>{
    return ((poll.user._id  === _poll.user._id) && ( ind !== pollIndex));
  }).splice(0,4)
  const otherPolls = polls.filter((poll,ind)=>{
    if((ind!== pollIndex)&&(!pollUserSuggestion.includes(poll))){ return poll}
    return null;
  });

  const categoryParentsList = getCategoryParentFromTree({findId:poll.category._id, categories:categories})
                                .map((category)=>{
                                        return (<BreadcrumbItem key={category['_id']}>
                                          <Link to={`/polls/category/${category['_id']}`}>{category['name']}</Link>
                                        </BreadcrumbItem>)
                                      });

  return (
        <Container>

        <div>
            <Breadcrumb listTag="div">
              <BreadcrumbItem>
                <p className='p-0 m-0'>Categories</p>
              </BreadcrumbItem>
              { categoryParentsList }
              <BreadcrumbItem>
                {pollId}
              </BreadcrumbItem>
            </Breadcrumb>
        </div>

          <div className='row'>
            <div className='col-sm-12'>
              <div>
                  {poll?(
                    <Card className="shadow-sm p-3 mb-5 bg-white rounded">
                      <CardBody>
                        <CardTitle className='h4'>{poll.question_text}</CardTitle>
                          <Container>
                            <ul className='list-group'>
                              { choices }
                            </ul>
                          </Container>
                      </CardBody>
                    </Card>
                  ):(<p>No Poll Found</p>)}

                </div>

                <hr></hr>
            </div>
            <div className='col-sm-12'>
              {pollUserSuggestion.length>0 ?(
                <Container>
                <br></br>
                  <p className='h5 text-left'>More By {poll.user.username}</p>
                  <RenderCardPolls polls={ pollUserSuggestion } categories = { categories}/>
                  <hr/>
                </Container>
              ):(null)}
              {otherPolls.length>0 ?(
                <Container>
                <br></br>
                  <p className='h5 text-secondary text-left'>Suggested Polls</p>
                  <RenderCardPolls polls={ otherPolls } categories = { categories} />
                </Container>
              ):(null)}


            </div>
          </div>
        </Container>
      );
}
export default PollDetailPage;
