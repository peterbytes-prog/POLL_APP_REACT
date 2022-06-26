import React, { Component } from 'react';
import fetch from 'cross-fetch';
import { baseUrl } from '../../shared/baseUrl';
import { Redirect, Link } from 'react-router-dom';
import { Container, Form, Label, Input, FormFeedback, FormGroup } from 'reactstrap';
import Loading from '../loading';
import RenderCardPolls from '../poll/pollcardgroup';
const stateUrl = 'http://localhost:3000'


class ProfilePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      profile:null,
      isOwner:false,
      fecth_error:null,
      fecth_loading:true,
      backgroundImage:"",
      image:"",
      touched:{
        title: false,
        fullname:false,
        about:false
      }
    }
    this.profileDetail = this.profileDetail.bind(this);
    this.profileDetailEdit = this.profileDetailEdit.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onTouched = this.onTouched.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.formRef = React.createRef();
  }
  onTouched(name){
    this.setState({
      touched:{...this.state.touched, [name]:true}
    })
  }
  onSubmit(event, name=false){
    let formData={}
    if(!name){
      event.preventDefault();
       formData = new FormData(event.target);
    }
    else{
       formData = new FormData();
       formData.append(name, event);
    }
    const bearer = 'Bearer '+localStorage.getItem('token');
    fetch(baseUrl + `users/profile/${this.props.userId}`,{
      method:'PUT',
      headers: {
        'Authorization': bearer
      },
      body:formData,
      credentials: "same-origin"
    })
    .then(response => {
      if(response.ok){
        return response.json()
      }
      else{
        const error = new Error('Error '+response.status);
        error.message = response.statusText;
        throw error
      }
    }, err => {
      throw err
    })
    .then(response => {
      window.location.reload(false);
    })
    .catch((error)=>{
      alert(error.message)
    })
  }
  profileDetail(){
    return(

        <div className="card">
          <img className="card-img-top" src={`${stateUrl}${this.state.profile.backgroundImage}`} alt="Bologna"></img>
          <div className="card-body text-center">
            <img style={{
              border: "0.3rem solid rgba(#fff, 0.3)",
              marginTop: "-6rem",
              marginBottom: "1rem",
              maxWidth: "9rem"
            }} className="avatar rounded-circle" src={`${stateUrl}${this.state.profile.image}`} alt="Bologna"></img>
            <h4 className="card-title">{ this.state.profile.fullname || " " }</h4>
            <h6 className="card-subtitle mb-2 text-muted">{this.state.profile.title}</h6>
            <p className='card-text'> {this.state.profile.about}</p>
          </div>
        </div>
    )
  }
  profileDetailEdit (){
    let errors = {
      title: "",
      fullname:"",
      about:""
    }
    if(this.state.touched.title && (this.state.profile.title.length<3)){
      errors.title = "Character Must Be Greater Than 2";
    }
    if(this.state.touched.fullname && (this.state.profile.fullname.length<3)){
      errors.fullname = "Character Must Be Greater Than 2";
    }
    if(this.state.touched.about && (this.state.profile.about.length<3)){
      errors.about = "Character Must Be Greater Than 2";
    }
    return(
      <Form ref={this.formRef} onSubmit={ this.onSubmit }>
          <div className="card">
            <img className="card-img-top" src={`${stateUrl}${this.state.profile.backgroundImage}`} alt="Bologna"></img>
             <Input type='file'
              name ='backgroundImage'
              style={{'position':'absolute', 'top': '0%', 'opacity':'0.5'}}
              onChange = {this.onInput('backgroundImage')}
            />
            <div className="card-body text-center">
              <div style={{'position':'relative'}}>

                <Input type='file'
                  name ='image'
                  onChange = {this.onInput('image')}
                  style={{'position':'absolute', 'left':'25%', 'bottom': '15%', 'opacity':'0.5', 'width':'50%'}}
                />

              <img style={{
                border: "0.3rem solid rgba(#fff, 0.3)",
                marginTop: "-6rem",
                marginBottom: "1rem",
                maxWidth: "9rem"
              }}
                className="avatar rounded-circle"
                src={`${stateUrl}${this.state.profile.image}`}
                alt="image"></img>
              </div>
              <FormGroup  >
                <Label className='font-weight-bold'>
                  Full Name:
                </Label>
                <Input type='text'
                      className="card-title"
                      onBlur={ (e) => this.onTouched('fullname') }
                      name = 'fullname'
                      onChange = {this.onInput('fullname')}
                      value={ this.state.profile.fullname }
                      />
                  <FormFeedback className={errors.fullname&&'d-block'}>{ errors.fullname }</FormFeedback>

              </FormGroup>
              <FormGroup>
                <Label className='font-weight-bold'>Title:</Label>
                <Input type='text'
                      onChange = {this.onInput('title')}
                      name = 'title'
                      onBlur={ (e) => this.onTouched('title') }
                      className="card-subtitle mb-2 text-muted h6"
                      value={this.state.profile.title || " "}
                      />
                <FormFeedback className={errors.title&&'d-block'}>{ errors.title }</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label className='font-weight-bold'>About Me:</Label>
                <Input name='about' onBlur={ (e) => this.onTouched('about') } onChange={this.onInput('about')} value={this.state.profile.about} type='textarea' className="card-text"  rows='10' />
                <FormFeedback className={errors.about&&'d-block'}>{ errors.about }</FormFeedback>
              </FormGroup>

              <button type='submit' className="btn btn-info">Update</button>
            </div>

          </div>
      </Form>
    )
  }
  componentDidMount(){
    if(this.state.fecth_error && this.state.fecth_loading){
      return;
    }
    const bearer = 'Bearer '+localStorage.getItem('token');
    fetch(baseUrl + `users/profile/${this.props.userId}`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
      },
      credentials: "same-origin"
    })
    .then(response => {
      if(response.ok){
        return response.json()
      }
      else{
        const error = new Error('Error '+response.status);
        error.message = response.statusText;
        throw error
      }
    }, err => {
      throw err
    })
    .then(response => {

      this.setState({

        profile:response.profile,
        isOwner: response.isOwner,
        image: response.profile.image,
        backgroundImage:response.profile.backgroundImage,
        fecth_error:null,
        fecth_loading:false
      })
    })
    .catch((error)=>{
      this.setState({
        profile:null,
        fecth_error:error.message,
        fecth_loading:false
      })
    })

  }
  onInput = (name) => (event) => {
    const value = event.target.value;
    if( ['fullname','title','about'].includes(name) ){
      this.setState({profile:{...this.state.profile, [name]:value}})
    }
    else{
      this.onSubmit(event.target.files[0], name)
    }
  }
  render(){

    const userPolls = this.props.polls.filter((poll)=>poll.user._id===this.props.userId);
    const votedPolls = this.props.polls.filter((poll) => {
      return (poll.votes.filter((vote)=>vote.user === this.props.userId )).length > 0
    });
    if(this.state.fecth_loading){
      return <Loading />
    }

    if(this.state.fecth_error && this.state.fecth_loading){
      return <p className="text-danger h2">{this.state.fecth_error}</p>
    }
    return(
      <Container>
        <div className="container">
          <div className="row">
            <div className="bg-white col-12 col-sm-12 col-md-6 col-lg-4 mb-sm-3">
              {this.state.isOwner?(this.profileDetailEdit()):(this.profileDetail())}
            </div>
            <Container style={{padding:'0px', margin:'0px'}} className="col-12 col-sm-12 col-md-6 col-lg-8 bg-white">

                { this.props.pollsLoading ?(
                  <Loading className='my-5'/>
                ):(
                  <div className='row px-0  mx-0'>
                    <div className='col-sm-12 px-sm-4 px-md-0  mx-0'>

                        <Container>
                        <br></br>
                        <div className='section-header d-flex justify-content-sm-start justify-content-md-between'>
                          <p className='h5 text-left'>Created Polls</p>
                          <Link to='/polls'>See More</Link>
                        </div>

                          <RenderCardPolls
                                      onDeletePoll = {this.props.onDeletePoll}
                                      user= {this.props.user }
                                      polls={ userPolls.splice(0,4)}
                                      categories={ this.props.categories }
                          />
                          <hr/>
                        </Container>

                        <Container>
                        <br></br>

                          <div className='section-header d-flex justify-content-sm-start justify-content-md-between'>
                            <p className='h5 text-left'>Recent Vote</p>
                            <Link to='/polls'>See More</Link>
                          </div>
                          <RenderCardPolls
                                onDeletePoll = {this.props.onDeletePoll}
                                user = {this.props.user }
                                polls={ votedPolls.splice(0,4) }
                                categories={ this.props.categories }
                          />
                          <hr/>
                        </Container>

                    </div>
                  </div>
                )}

            </Container>
          </div>
        </div>
      </Container>
    )
  }
}
export default ProfilePage;
