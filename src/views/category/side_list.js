import React, {Component} from 'react';
import {DropdownItem,
Dropdown,
DropdownToggle,
DropdownMenu} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class CategoryDropDown extends Component{
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen:false
    }
  }
  toggle(){
    this.setState(prevState =>({
      isOpen: !prevState.isOpen
    }));
  }
  constructDropDown(category){
    if(category.subCategories.length){
      return (
        <NavLink to={`/polls/category/${category._id}`} style={{textAlign:'left'}} key={category.id} className='ml-4 page-link category-link'>
          >  {category.name}{category.subCategories.map((cat)=>this.constructDropDown(cat))}
        </NavLink>)
    }else{
        return (
          <NavLink to={`/polls/category/${category._id}`} style={{textAlign:'left'}} className='ml-2 page-link category-link' key={category.id}>- {category.name}</NavLink>
        );
    }
  }
  render(){
    const subcategory = this.props.category.subCategories;
    return(
      <NavLink className='page-link category-link' to={`/polls/category/${this.props.category._id}`} style={{textAlign:'left'}} key={this.props.category.id}>
        > {this.props.category.name}{this.props.category.subCategories.map((cat)=>this.constructDropDown(cat))}
      </NavLink>
    )
  }
}


export default CategoryDropDown;
