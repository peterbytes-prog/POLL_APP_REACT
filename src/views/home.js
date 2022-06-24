import * as React from 'react';
import PollMediaCard from './poll/pollcard';
import { NavLink } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, CardGroup, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import RenderCardPolls from './poll/pollcardgroup';
import CategoryDropDown from './category/side_list';
import Loading from './loading';


function HomePage({recentPolls, popularPolls, trendingPolls, pollsLoading, pollsErrMess, categories, categoriesLoading, user, categoriesError}){


  return (
        <Container className=''>
          <div className='home jumbotron'>
            <div className='row'>
              <div className='col-sm-12 col-md-6 text-left'>
                <h1>Poll Simple</h1>
              </div>
              <div className='col-sm-12 col-md-6 text-sm-left text-md-right'>
                <NavLink className='btn btn-dark' to='/polls/create'>CREATE POLL</NavLink>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-12 col-md-4'>
              <Container className='text-left'>
                <p className='h4 text-theme-four'>Categories</p>
                {categoriesLoading?(
                  <Loading />
                ):(
                  categories.map((category)=><CategoryDropDown
                                                  key ={category._id}
                                                  categoriesLoading={categoriesLoading}
                                                  categories = {categories}
                                                  category={category}
                                                />
                                  )
                )}

              </Container>
            </div>
            <div className='col-sm-12 col-md-8'>
              { pollsLoading ?(
                <Loading className='my-5'/>
              ):(
                <div className='row'>
                  <div className='col-sm-12'>

                      <Container>
                      <br></br>
                        <p className='h5 text-left'>Trending Polls</p>
                        <RenderCardPolls user={user} polls={trendingPolls} categories={ categories } />
                        <hr/>
                      </Container>

                      <Container>
                      <br></br>
                        <p className='h5 text-left'>Recent Polls</p>
                        <RenderCardPolls user={user} polls={recentPolls} categories={ categories } />
                        <hr/>
                      </Container>

                      <Container>
                      <br></br>
                        <p className='h5 text-secondary text-left'>Popular Polls</p>
                        <RenderCardPolls user={user} polls={ popularPolls } categories={ categories }/>
                      </Container>



                  </div>
                </div>
              )}

            </div>

          </div>
        </Container>
      );

}

export default HomePage;
