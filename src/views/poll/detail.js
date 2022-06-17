import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, CardGroup, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PollMediaCard from './pollcard';
import { Link } from 'react-router-dom';
import RenderCardPolls from './pollcardgroup';
import { getCategoryParentFromTree } from '../../logic.js';
import Loading from '../loading';



function RenderChoice({votes, choice, onVote}){
  const handleVote = () =>{
    onVote(1, choice);
  }
  return (
    <li style={{border:'none'}} className='list-group-item' >
      <div  className='choice'>
        <div style={{'border-radius':'50%', width:'3em', height:'3em', 'display':'flex'}} className='mr-2 border border-secondary'>
          <p style={{display:'block', margin:'auto'}}>{parseInt((choice.votes.length/votes)*100||0)}%</p>
        </div>
        <div onClick={ handleVote } className='border border-secondary d-flex'>
            <p style={{display:'block', margin:'auto'}}> { choice.choice_text }</p>
        </div>
      </div>
    </li>
  )
}
function PollDetailPage({polls, pollId, onVote, categories, pollsLoading, pollsErrMess}){

  if (pollsLoading || polls.length==0){
    return <Loading />
  }
  let poll = polls.filter((poll)=>poll._id['$oid'] === pollId);
  poll = poll.length > 0 ? poll[0] : null;
  const votes = poll ? poll.choices.reduce((prev, cur)=>prev + cur.votes.length, 0) : 0;
  const choices = poll ? poll.choices.map((choice) => <RenderChoice key={choice._id['$oid']} votes={votes} choice={choice} onVote={onVote} />) : null;

  const pollIndex = polls.indexOf(poll);

  const otherPolls = polls.filter((poll,ind)=>{
    if(ind!== pollIndex){ return poll}
  });
  const pollUserSuggestion = polls.filter((_poll,ind)=> ((poll.userid.username  === _poll.userid.username)&&( ind !== pollIndex)))

  const categoryParentsList = getCategoryParentFromTree({findId:poll.categoryid['$oid'], categories:categories})
                                .map((category)=>{
                                        return (<BreadcrumbItem>
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
                  <p className='h5 text-left'>More By {poll.userid.username}</p>
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
