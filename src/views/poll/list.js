import React from 'react';
import PollMediaCard from './pollcard';
import { NavLink } from 'react-router-dom';


function PollListPage({polls}){
  const polls_list = polls.map(function(poll){
    console.log(poll)
    return(
      <li style={{ border: 'none'}}className='list-group-item my-1' key={poll._id['$oid']}>
        <PollMediaCard poll={poll}/>
      </li>
    )
  })
  return(<div>

            <div className='jumbotron'>
              <div className='row'>
                <div className='col-sm-12 col-md-6 text-left'>
                  <h1>HomePage</h1>
                </div>
                <div className='col-sm-12 col-md-6 text-sm-left text-md-right'>
                  <NavLink className='btn btn-dark' to='/'>CREATE POLL</NavLink>
                </div>
              </div>

            </div>
            <div className='container'>
              <ul className='list-group'>
                { polls_list }
              </ul>
            </div>

          </div>)
}

export default PollListPage;
