import React from "react";

import Category from "../category/category.component";

import { CategoryMenuContainer } from "./category-menu.styles.jsx";

const CategoryMenu = ({ categoriesTitle }) => {
  return (
    <CategoryMenuContainer>
      {categoriesTitle.map(title => (
        <Category key={title} title={title} />
      ))}
    </CategoryMenuContainer>
  );
};

export default CategoryMenu;
