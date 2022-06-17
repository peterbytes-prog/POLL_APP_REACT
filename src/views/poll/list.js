import React from 'react';
import PollMediaCard from './pollcard';
import { NavLink } from 'react-router-dom';
import {Container } from 'reactstrap';
import CategoryDropDown from './../category/side_list';
import { getCategoryParentFromTree } from '../../logic.js';


function PollListPage({polls, categories}){
  const polls_list = polls.map(function(poll){
    return(
      <li style={{ border: 'none'}}className='list-group-item my-1' key={poll._id['$oid']}>
        <PollMediaCard poll={poll} categories={categories}/>
      </li>
    )
  })
  return(
          <Container>
            <div className='row'>
              <div className='col-sm-12 col-md-4'>
                <Container className='text-left'>
                  <p className='h4'>Categories</p>
                  { categories.map((category)=><CategoryDropDown category={category}/>)}
                </Container>
              </div>
              <div className='col-sm-12 col-md-8'>
                <div className='container'>
                  <ul className='list-group'>
                    { polls_list.length>0? (polls_list):(<p>No Poll Found</p>) }
                  </ul>
                </div>
              </div>
            </div>
          </Container>)
}

export default PollListPage;
