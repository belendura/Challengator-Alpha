import React, { useEffect } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";

import { fetchChallengesTemplateStart } from "../../redux/challengesTemplates/challengesTemplates.actions";

import { openModal } from "../../redux/modal/modal.actions";

import {
  selectChallengesTemplatesCategories,
  selectChallengesTemplatesFetching
} from "../../redux/challengesTemplates/challengesTemplates.selectors";

import Scroll from "../../components/scroll/scroll.component";
import CategoryMenu from "../../components/category-menu/category-menu.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import Overview from "../../components/overview/overview.component";

import { HomePageContainer, CategoryMenuContainer } from "./homepage.styles";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChallengesTemplateStart());
  }, []);

  const isFetching = useSelector(
    selectChallengesTemplatesFetching,
    shallowEqual
  );

  const categoriesTitle = useSelector(
    selectChallengesTemplatesCategories,
    shallowEqual
  );

  return (
    <div>
      <HomePageContainer>
        <CategoryMenuContainer>
          <CustomButton
            onClick={() => (document.querySelector(".scroll").scrollLeft += 20)}
          >
            SLIDE LEFT
          </CustomButton>
          <Scroll horizontal>
            {!isFetching ? (
              <CategoryMenu categoriesTitle={categoriesTitle} />
            ) : null}
          </Scroll>
          <CustomButton
            onClick={() => (document.querySelector(".scroll").scrollLeft -= 20)}
          >
            SLIDE RIGHT
          </CustomButton>
        </CategoryMenuContainer>
        <Scroll vertical>
          <Overview />
        </Scroll>
        <CustomButton
          onClick={() => dispatch(openModal("PROPOSE_CHALLENGE", null))}
        >
          PROPOSE CHALLENGE
        </CustomButton>
      </HomePageContainer>
    </div>
  );
};

export default HomePage;
