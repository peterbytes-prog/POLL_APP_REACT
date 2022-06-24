import React from 'react';
import { Media, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { getCategoryParentFromTree } from '../../logic.js';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const stateUrl = 'http://localhost:3000'

function PollMediaCard({poll, categories, card, user, onDeletePoll }){
  const categoryParentsList = getCategoryParentFromTree({findId:poll.category._id, categories:categories})
                                .map((category)=>{
                                        return (<BreadcrumbItem key={category['_id']}>
                                          <Link to={`/polls/category/${category['_id']}`}>{category['name']}</Link>
                                        </BreadcrumbItem>)
                                      });

  let editable = ( ) => {
    if(!onDeletePoll || !user.user){
      return null
    }
    else if(poll.user._id === user.user._id){
      return (<Button onClick={()=>onDeletePoll(poll._id)} className="p-0 bg-danger" style={{'position':'absolute', 'top':'1%', 'right':'1%','z-index':'0', 'width':'1.5rem', 'height':'1.5rem'}}><FontAwesomeIcon icon={faTrash}/></Button>)
    }
    return null;
  }
  return (

      <Media style={{overflow:'hidden', width:'100%'}} className=' p-2 poll-detail'>
        <Media left>
          <Media className='border rounded-circle border-dark' object src={`${stateUrl}/${poll.profile[0].image}`} alt="cat" style={{width:'2em', height:'2em'}}>
          </Media>
        </Media>
        <Media body className='px-2'>
          <div  className='text-left'>
            <NavLink to={`/profile/${poll.user._id}`} className='text py-0'>{poll.profile[0].fullname}</NavLink><br></br>
            <span className='text py-0'>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(poll.createdAt)))}</span>
          </div>
          <br></br>
          <div className='text-left'>
              <Breadcrumb listTag="div">
                <BreadcrumbItem>
                  <p className='p-0 m-0'>IN:</p>
                </BreadcrumbItem>
                { categoryParentsList }
              </Breadcrumb>
          </div>
          <NavLink style={{ 'textDecoration':'none'}} className="text-theme-four" to={`/polls/${poll._id}`} >
                <Media heading  className=''>
                  <div className="">
                    {poll.question_text}
                  </div>
                </Media>
                <div className='row'>
                  <p className='col-sm-11 offset-1 col-md-5 text-left'>Choices: {poll.choices.length}</p>
                  <p className='col-sm-11 offset-sm-1 col-md-5 text-sm-left text-md-right'>Votes : {poll.choices.reduce((prev, cur)=>prev + cur.votes.length, 0)} </p>
                </div>
          </NavLink>

          {editable()}
        </Media>
      </Media>

  )
}
export default PollMediaCard;
