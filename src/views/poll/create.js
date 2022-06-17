import React, { Component } from 'react';
import {
  Container,
  FormGroup,
  Row,
  Col,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'


class CreatePollPage extends Component{
  constructor(props){
    super(props)
    const { categories = [] } = this.props;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.minLength = (len) => (val) => val && val.length>=len;
    this.ChoiceForm = this.ChoiceForm.bind(this);
    this.removeChoice = this.removeChoice.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      success:false,
      choice_text:["", ""],
      category: null,
      categories: [this.props.categories],

    }
    this.arr = [];
  }
  handleSubmit(values){
    const choice_text = this.state.choice_text.filter((choice)=>choice.length>=1);
    const question_text = values.question_text;
    this.props.onCreatePoll(1,question_text, choice_text, this.state.category);
    this.setState({
      success: true
    })

    // alert(JSON.stringify(values))


  }
  ChoiceForm({deletable, value, ind}){
    const handleInput = (e) =>{
      let cur = e.target.value;
      const new_choice_texts = this.state.choice_text;
      new_choice_texts[ind] = cur;
      this.setState({
        choice_text: new_choice_texts
      })
    }
    return(
      <FormGroup row>
        <Col sm={12} md={4} className='text-left font-weight-bold'>
          <Label className='' htmlFor='username'>Choice Text</Label>
        </Col>
        <Col sm={10} md={7} className='offset-sm-1 offset-md-0'>
          <Control.textarea
              rows='2'
              className='form-control'
              model = {`.choice_text${ind}`}
              name='choice_text'
              onChange = {handleInput}
              value={value}
              validators ={{
                  minLength:this.minLength(3)
              }}
            />
          <Errors
            model = {`.choice_text${ind}`}
            className ='text-danger'
            show = "touched"
            messages ={{
              minLength: "Must be greater than 2 characters"
            }}
          />
        </Col>
        <Col sm={1} className=''>
          {
            deletable?(
              <Button className='btn-danger' onClick={ (e)=>this.removeChoice(ind) }>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            ):(
              <p className='btn btn-secondary'>
                <FontAwesomeIcon icon={faTrash} />
              </p>
            )
          }

        </Col>
      </FormGroup>
    )

  }
  addChoice(){
    this.setState({
      choice_text: this.state.choice_text.concat([""])
    })
  }
  removeChoice(ind){
    this.setState({
      choice_text: this.state.choice_text.filter( (text, _ind) => _ind!==ind )
    })
  }
  handleCategoryChange(val, ind){
    if(val === undefined ){
      return
    }
    let _selected = false;
    let cats = this.state.categories[ind].map((c)=>{
      if (c._id === parseInt(val)){
        _selected = c;
        return {...c, selected:true}
      }
      return {...c, selected:false}
    })
    let _categories = this.state.categories;
    _categories[ind] = cats;
    _categories  = _categories.filter((content,i)=>i<=ind);
    if(_selected && _selected.subCategories.length>0){

      _categories.push(_selected.subCategories);
    }
    this.setState({
      categories:   _categories,
      category: _selected
    });
  }
  render(){
    if(this.state.success){
      return <Redirect to='/polls' />
    }
    const ChoiceForm = this.ChoiceForm;
    const choiceForms = this.state.choice_text.map((text, ind)=>{
      let deletable = false;
      if(ind>1){
        deletable = true;
      }
      return <ChoiceForm deletable={deletable} key={ind} value={text} ind={ind}/>
    })

    let arr = [];
    for(let ind in this.state.categories){
      const categories = this.state.categories[ind];
      let selected = "";
      const opts = categories.map( (c) => { if(c.selected){selected=c._id} return(<option value={c._id} >{c.name}</option>) } );
      opts.unshift(<option value=""></option>)
      arr.push(<Control.select
                  value={selected}
                  onInput={(e)=>this.handleCategoryChange(e.target.value, ind)}
                   model={`.cat_${ind}`} className='form-control'>
                {opts}
              </Control.select>
            )

    }
    return (
      <Container>
      <div className='create jumbotron mb-5'>
        <div className='row'>
          <div className='col-sm-12 col-md-6 text-left'>
            <h1>Create New Poll</h1>
          </div>
        </div>
      </div>
      <br/>
        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
          <FormGroup row>
            <Col sm={12} md={4} className='text-left font-weight-bold'>
              <Label className='' htmlFor='username'>Poll Text</Label>
            </Col>
            <Col sm={12} md={8} className='offset-sm-1 offset-md-0'>
              <Control.textarea
                  rows='5'
                  className='form-control'
                  model='.question_text'
                  name='question_text'
                  id='question_text'
                  validators ={{
                      minLength:this.minLength(3)
                  }}
                />
              <Errors
                model = '.question_text'
                className ='text-danger'
                show = "touched"
                messages ={{
                  minLength: "Must be greater than 2 characters"
                }}
              />
            </Col>
          </FormGroup>
          <hr/>
          <Row>
            <Col sm={12}>
              { choiceForms }
            </Col>
            <Col sm={12}>
              <Button type='button' onClick={ (e)=> this.addChoice() } className='bg-light btn-outline-success'>
                <FontAwesomeIcon icon={faAdd} /> Choice
              </Button>
            </Col>
          </Row>
          <hr/>
          <FormGroup row>
            <Col sm={12} md={4} className='text-left font-weight-bold'>
              <Label className='' htmlFor='categories'>Category</Label>
            </Col>
            <Col sm={12} md={8} className='offset-sm-1 offset-md-0'>
              {arr}
            </Col>
          </FormGroup>
          <hr/>
          <div className='text-center my-4 py-2'>
            <Button type='submit' className='px-5 bg-info'>Create Poll</Button>
          </div>
        </LocalForm>
      </Container>
    )
  }
}
export default CreatePollPage;
