import React from "react";
import { useDispatch } from "react-redux";

import { setCategoryOverview } from "../../redux/challengesTemplates/challengesTemplates.actions";

import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";

const Category = ({ title }) => {
  const dispatch = useDispatch();
  return (
    <CategoryContainer onClick={() => dispatch(setCategoryOverview(title))}>
      <CategoryTitle> {title} </CategoryTitle>
    </CategoryContainer>
  );
};

export default Category;
