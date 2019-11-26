import React from "react";
import {connect} from "react-redux";

import {createStructuredSelector} from "reselect";
import {selectDirectoryCategoriesTitle} from "../../redux/directory/directory.selectors";

import Category from "../category/category.component";

import "./category-menu.styles.scss";

const CategoryMenu= ({categoriesTitle})=> {
    
    return(
    <div className="category-menu-container">
    {categoriesTitle.map((title) => 
    <Category key={title} title={title}/>)}
    </div>

)
}

const mapStateToProps = createStructuredSelector({
    categoriesTitle: selectDirectoryCategoriesTitle,
  });
  
  export default connect(mapStateToProps)(CategoryMenu);