import React from 'react';
import { Card, CardGroup, CardFooter, CardBody } from 'reactstrap';
import PollMediaCard from './pollcard';


function RenderCardPolls({polls, limits, categories, user, onDeletePoll=false}){
  const poll_cards = polls.map((poll)=>{
    return (<Card style={{border:'none', minWidth:'15rem'}} className='m-1' key={poll._id}>

              <PollMediaCard onDeletePoll={onDeletePoll} user={user} poll={poll} categories={categories} card={true}/>

            </Card>)
  })
  return (
    <CardGroup>
      { poll_cards.length>0?(poll_cards):(<p>No Poll Found</p>) }
    </CardGroup>
  )
}

export default RenderCardPolls;
