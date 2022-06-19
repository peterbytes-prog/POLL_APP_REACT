import React, { Component } from 'react';
import {
  Container,
  Form,
  FormGroup,
  Col,
  Label,
  Input,
  Button,
  FormFeedback,
  InputGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

class SignUpPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      email: '',
      password1: '',
      password2: '',
      touched:{
        username: false,
        email: false,
        password1: false,
        password2: false,
      },
      isOpen: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTouched = this.onTouched.bind(this);
    this.onInput = this.onInput.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal(){
    this.setState({isOpen:!this.state.isOpen})
  }
  onInput(event){
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  handleSubmit(event){
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password1,
      email: this.state.email
    }
    this.props.signupUser(data);
  }
  onTouched(field){
    this.setState({
      touched: {...this.state.touched, [ field ]: true}
    })
  }
  displayModal(){
    if(this.props.signup.errMess){
      return (
        <div>
          <Modal isOpen={this.state.isOpen } toggle={ this.toggleModal }>
            <ModalHeader className='bg-danger' toggle={ this.toggleModal }>Sign up Error </ModalHeader>
            <ModalBody>
              { this.props.signup.errMess }
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={this.toggleModal}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
      )
    }else if(this.props.signup.signedUp){
      return (
        <div>
          <Modal isOpen={this.state.isOpen } toggle={ this.toggleModal }>
            <ModalHeader className='bg-info' toggle={ this.toggleModal }>Sign up Successful! </ModalHeader>
            <ModalBody>
              Account Successful Created, You're ready to login
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={this.toggleModal}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
      )
    }
    return null;
  }
  render(){
    let errors = {
      username: "",
      email: '',
      password1: '',
      password2: '',
    }
    if(this.state.touched.username){
      if(this.state.username.length < 4){
        errors['username'] = "username must be 4 or more character long"
      }
    }
    if(this.state.touched.email){
      if(!(this.state.email.includes('@')&&this.state.email.includes('.'))){
        errors['email'] = "Enter a valid email address"
      }
    }
    if(this.state.touched.password1){
      if(this.state.password1.length < 4){
        errors['password1'] = "password must be 4 or more character long"
      }
    }
    if(this.state.touched.password2){
      if(this.state.password2 !== this.state.password1){
        errors['password2'] = "password doesn't matched"
      }
    }

    return(
      <Container className="py-3">
        { this.displayModal() }
        <Form onSubmit={ this.handleSubmit }>
          <FormGroup row>
            <Col sm={12} md={4} className='text-left font-weight-bold'>
              <Label className='' htmlFor='username'>Username</Label>
            </Col>
            <Col sm={12} md={8} className='offset-sm-1 offset-md-0'>
            <InputGroup>
              <Input onChange={this.onInput} onBlur={ (e) => this.onTouched('username') } name='username' id='username' type='text' />
              <FormFeedback className={errors.username&&'d-block'}>{ errors.username }</FormFeedback>
            </InputGroup>

            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12} md={4} className='text-left font-weight-bold'>
              <Label className='' htmlFor='email'>Email</Label>
            </Col>
            <Col sm={12} md={8} className='offset-sm-1 offset-md-0'>
              <InputGroup>
                <Input onChange={this.onInput} onBlur={ (e) =>this.onTouched('email') } name='email' id='email' type='email' />
                <FormFeedback className={errors.email&&'d-block'}>{ errors.email }</FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12} md={4} className='text-left font-weight-bold'>
              <Label className='' htmlFor='password1'>Password</Label>
            </Col>
            <Col sm={12} md={8} className='offset-sm-1 offset-md-0'>
              <InputGroup>
                <Input onChange={this.onInput} onBlur={ (e) =>this.onTouched('password1') } name='password1' id='password1' type='password' />
                <FormFeedback className={errors.password1&&'d-block'} >{ errors.password1 }</FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12} md={4} className='text-left font-weight-bold'>
              <Label className='' htmlFor='password2'>Confirm Password</Label>
            </Col>
            <Col sm={12} md={8} className='offset-sm-1 offset-md-0'>
              <InputGroup>
                <Input onChange={this.onInput} onBlur={ (e) =>this.onTouched('password2') } name='password2' id='password2' type='password' />
                <FormFeedback className={errors.password2&&'d-block'}>{ errors.password2 }</FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
          <div className='text-center'>
            <Button type='submit' className='px-5 bg-info'>Create Account</Button>
          </div>
        </Form>
      </Container>
    )
  }
}

export default SignUpPage;
