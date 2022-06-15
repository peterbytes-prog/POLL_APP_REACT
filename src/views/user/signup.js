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
  InputGroup
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
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTouched = this.onTouched.bind(this);
    this.onInput = this.onInput.bind(this);
  }
  onInput(event){
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  handleSubmit(event){
    alert(
      `
      username: ${this.state.username}, email: ${this.state.email}, password1: ${this.state.password1}, password2: ${this.state.password2}
      `
    )
    event.preventDefault();
  }
  onTouched(field){
    console.log('blur', field)
    this.setState({
      touched: {...this.state.touched, [ field ]: true}
    })
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
      if(this.state.password2 != this.state.password1){
        errors['password2'] = "password doesn't matched"
      }
    }
    return(
      <Container className="py-3">
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
