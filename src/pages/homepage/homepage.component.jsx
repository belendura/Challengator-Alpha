import React from "react";

import Scroll from "../../components/scroll/scroll.component";
import CategoryMenu from "../../components/category-menu/category-menu.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import Overview from "../../components/overview/overview.component";

import {HomePageContainer , CategoryMenuContainer} from "./homepage.styles";

const HomePage = ()=>{
return(  
    <div>
    <HomePageContainer>
        <CategoryMenuContainer>
        <CustomButton onClick={()=> document.querySelector(".scroll").scrollLeft +=20}>SLIDE LEFT</CustomButton>
        <Scroll horizontal>
            <CategoryMenu/>
        </Scroll> 
        <CustomButton onClick={()=> document.querySelector(".scroll").scrollLeft -=20}>SLIDE RIGHT</CustomButton>
        </CategoryMenuContainer>
        <Scroll vertical>
        <Overview/> 
        </Scroll> 
    </HomePageContainer>
    </div>
)
}

export default HomePage;
