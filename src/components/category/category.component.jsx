import React from "react";
import {connect} from "react-redux";

import {setCategoryOverview} from "../../redux/categories/categories.actions";

import "./category.styles.scss";

const Category =({title, setCategoryOverview})=>(

    <div className= "category-container"
    onClick={()=>setCategoryOverview(title)}>
    <div className="title"> {title} </div>
    </div>
)

const mapDispatchToProps= dispatch =>({
    setCategoryOverview: title => dispatch(setCategoryOverview(title)),
    })
    
export default connect(null, mapDispatchToProps)(Category);