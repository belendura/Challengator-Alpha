import styled from "styled-components";

export const MenuItemComponent = styled.div`
  padding: 0 40px;
  margin: 5px 10px;
  user-select: none;
  cursor: pointer;
  border: none;

  .menu-item-wrapper.active {
    border: 1px blue solid;
  }
  .menu-item.active {
    border: 1px green solid;
  }
`;

export const ScrollMenuArrowContainer = styled.div`
  padding: 20px;
  cursor: pointer;

  .scroll-menu-arrow--disabled {
    visibility: hidden;
  }
`;
