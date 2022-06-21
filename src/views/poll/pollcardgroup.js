import React from 'react';
import { Card, CardGroup, CardFooter, CardBody } from 'reactstrap';
import PollMediaCard from './pollcard';


function RenderCardPolls({polls, limits, categories}){
  const poll_cards = polls.map((poll)=>{
    return (<Card style={{border:'none', minWidth:'15rem'}} className='m-1' key={poll._id}>

              <PollMediaCard poll={poll} categories={categories} card={true}/>
              
            </Card>)
  })
  return (
    <CardGroup>
      { poll_cards }
    </CardGroup>
  )
}

export default RenderCardPolls;
