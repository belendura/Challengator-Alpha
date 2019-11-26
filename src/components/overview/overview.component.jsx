import React from "react";
import {connect} from "react-redux";

import {createStructuredSelector} from "reselect";

import {selectCategory} from "../../redux/categories/categories.selectors";
import {selectDirectoryCategoriesTitle,selectDirectoryObj } from "../../redux/directory/directory.selectors";

import ChallengeItem from "../../components/challenge-item/challenge-item.component";

import "./overview.styles.scss";

const Overview =({selectedCategory, directoryObj})=>{
    return(
    <div className="overview">
        <div className="items"> 
         {
            directoryObj[selectedCategory].items.map(item=> <ChallengeItem key={item.id} item={item}/>)
         }
        </div>
    </div>
    )
};

const mapStateToProps = (state, ownProps) => ({
    selectedCategory: selectCategory(state),
    directoryObj: selectDirectoryObj("title")(state),
})

export default connect(mapStateToProps)(Overview);

