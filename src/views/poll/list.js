import React from 'react';
import PollMediaCard from './pollcard';
import { NavLink } from 'react-router-dom';
import {Container } from 'reactstrap';
import CategoryDropDown from './../category/side_list';
import { getCategoryParentFromTree } from '../../logic.js';
import Loading from '../loading';


function PollListPage({polls, pollsLoading, pollsErrMess, categories, categoriesLoading, categoriesError, user}){
  const polls_list = polls.map(function(poll){
    return(
      <li style={{ border: 'none'}}className='list-group-item my-1' key={poll._id}>
        <PollMediaCard poll={poll} categories={categories} user={user}/>
      </li>
    )
  })

  return(
          <Container>
            <div className='row'>
              <div className='col-sm-12 col-md-4'>
                <Container className='text-left'>
                  <p className='h4'>Categories</p>
                  {categoriesLoading?(
                      <Loading />
                  ):(
                      categories.map((category)=><CategoryDropDown categories={categories} Loading={categoriesLoading} category={category}/>)
                  )}
                </Container>
              </div>
              <div className='col-sm-12 col-md-8'>
                { pollsLoading ?(
                      <Loading className='my-5'/>
                    ):(
                      <div className='container'>
                        <ul className='list-group'>
                          { polls_list.length>0? (polls_list):(<p>No Poll Found</p>) }
                        </ul>
                      </div>
                    )
                }
              </div>
            </div>
          </Container>)
}

export default PollListPage;
