import React from 'react';
import { Card, CardGroup } from 'reactstrap';
import PollMediaCard from './pollcard';


function RenderCardPolls({polls, limits}){
  const poll_cards = polls.map((poll)=>{
    return (<Card style={{border:'none'}} className='m-1' key={poll._id['$oid']}>
              <PollMediaCard poll={poll}/>
            </Card>)
  })
  return (
    <CardGroup>
      { poll_cards }
    </CardGroup>
  )
}

export default RenderCardPolls;
