import React from 'react';
import { Media } from 'reactstrap';
import {NavLink} from 'react-router-dom';
function PollMediaCard({poll}){
  // {/* <NavLink to='/home'> */}
    // {/* </NavLink > */}
  return (

      <Media className=' p-2 poll-detail'>
        <Media left>
          <Media className='border rounded-circle border-dark' object src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210728124621/geekslogo.png" alt="cat" style={{width:'2em', height:'2em'}}>
          </Media>
        </Media>
        <Media body className='px-2'>
          <div  className='text-left'>
            <span className='text py-0'>{poll.userid.username}</span><br></br>
            <span className='text py-0'>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(poll.date)))}</span>
          </div>
          <br></br>
          <p className='text-left'>IN: <NavLink className='text-theme-one' to='polls/politics'>Politics</NavLink> > <NavLink className='text-theme-one' to='polls/politics/conservatism'>Conservatism </NavLink> </p>
          <NavLink style={{ 'textDecoration':'none'}} className="text-theme-four" to={`/polls/${poll._id['$oid']}`} >
                <Media heading>
                  <div  className='text-left'>
                    {poll.question_text}
                  </div>
                </Media>
                <div className='row'>
                  <p className='col-sm-11 offset-1 col-md-5 text-left'>Choices: {poll.choices.length}</p>
                  <p className='col-sm-11 offset-sm-1 col-md-5 text-sm-left text-md-right'>Votes : {poll.choices.reduce((prev, cur)=>prev + cur.votes.length, 0)} </p>
                </div>
          </NavLink>
        </Media>
      </Media>

  )
}
export default PollMediaCard;
