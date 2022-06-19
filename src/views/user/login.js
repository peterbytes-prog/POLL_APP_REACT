import React, { Component } from 'react';
import { Container, Input, FormGroup, Label, Form, Col, Button } from 'reactstrap';
class SignInPage extends Component{
  constructor(props){
    super(props)
    this.username = '';
    this.password = '';
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event){
    this.props.loginUser({
      username: this.username.value,
      password: this.password.value
    })
    event.preventDefault();
  }
  render(){
    return (
            <Container className='py-3'>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Col sm={12} md={4} className='text-left font-weight-bold'>
                    <Label className='' htmlFor='username'>Username</Label>
                  </Col>
                  <Col sm={12} md={8} className='offset-sm-1 offset-md-0'>
                    <Input innerRef={(input)=> this.username=input} name='username' id='username' type='text' />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={12} md={4} className='text-left font-weight-bold'>
                    <Label className='' htmlFor='password'>Password</Label>
                  </Col>
                  <Col sm={12} md={8} className='offset-sm-1 offset-md-0'>
                    <Input innerRef={(input)=> this.password=input } name='password' id='password' type='password' />
                  </Col>
                </FormGroup>
                <div className='text-center'>
                  <Button type='submit' className='px-5 bg-info'>Sign In</Button>
                </div>
              </Form>
            </Container>
    )
  }
}

export default SignInPage;
