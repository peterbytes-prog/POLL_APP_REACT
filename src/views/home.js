import * as React from 'react';
import PollMediaCard from './poll/pollcard';
import { NavLink } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, CardGroup, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import RenderCardPolls from './poll/pollcardgroup';


function HomePage({polls}){

  const otherPolls = polls.map((poll,ind)=>poll);
  const pollUserSuggestion = polls.map((poll,ind)=>poll);

  return (
        <Container>
        <div className='jumbotron'>
          <div className='row'>
            <div className='col-sm-12 col-md-6 text-left'>
              <h1>Poll Simple</h1>
            </div>
            <div className='col-sm-12 col-md-6 text-sm-left text-md-right'>
              <NavLink className='btn btn-dark' to='/'>CREATE POLL</NavLink>
            </div>
          </div>

        </div>
          <div className='row'>

            <div className='col-sm-12'>
              {pollUserSuggestion.length>0 ?(
                <Container>
                <br></br>
                  <p className='h5 text-left'>Recent Polls</p>
                  <RenderCardPolls polls={pollUserSuggestion} />
                  <hr/>
                </Container>
              ):(null)}
              {otherPolls.length>0 ?(
                <Container>
                <br></br>
                  <p className='h5 text-secondary text-left'>Suggested Polls</p>
                  <RenderCardPolls polls={ otherPolls } />
                </Container>
              ):(null)}


            </div>
          </div>
        </Container>
      );

}

export default HomePage;
