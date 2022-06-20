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
    this.constructDropDown = this.constructDropDown.bind(this)
    this.state = {
      isOpen:false
    }
  }
  toggle(){
    this.setState(prevState =>({
      isOpen: !prevState.isOpen
    }));
  }
  constructDropDown(cat){
    if(this.props.categories === undefined){
      return null;
    }
    let category = this.props.categories.filter((_cat)=>_cat._id === cat);
    if(category.length>0){
      category = category[0]
    }else{
      return null;
    }
    if(category.subcategories.length){
      return (
        <NavLink to={`/polls/category/${category._id}`} style={{textAlign:'left'}} key={category.id} className='ml-4 page-link category-link border-right-0 border-bottom-0 border-left-0'>
          >  {category.name}{category.subcategories.map((_cat)=>this.constructDropDown(_cat))}
        </NavLink>)
    }else{
        return (
          <NavLink to={`/polls/category/${category._id}`} style={{textAlign:'left'}} className='ml-2 page-link category-link' key={category.id}>- {category.name}</NavLink>
        );
    }
  }
  render(){
    if(this.props.category.parent){
      return null
    }
    const subcategory = this.props.category.subcategories;
    return(
      <NavLink className='page-link category-link' to={`/polls/category/${this.props.category._id}`} style={{textAlign:'left'}} key={this.props.category.id}>
        > {this.props.category.name}{this.props.category.subcategories.map((cat)=>this.constructDropDown(cat))}
      </NavLink>
    )
  }
}


export default CategoryDropDown;
