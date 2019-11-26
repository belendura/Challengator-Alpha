import React from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";

import "./scroll-bar.styles.scss";

import {CATEGORIES} from "../category-list/category.data";

const MenuItem = ({ text, selected }) => {
  return <div className={`menu-item ${selected ? "active" : ""}`}>{text}</div>;
};

export const Menu = list =>
  CATEGORIES.map(item => {const { name } = item;
    return <MenuItem text={name} key={name} />;
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};


export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class ScrollBar extends React.Component {
  state = {
    alignCenter: false,
    clickWhenDrag: false,
    dragging: true,
    hideArrows: true,
    hideSingleArrow: true,
    itemsCount: CATEGORIES.length,
    selected: "item1",
    translate: 0,
    transition: 0.4,
    wheel: true
  };

  constructor(props) {
    super(props);
    this.menu = null;
    this.menuItems = Menu(CATEGORIES.slice(0, CATEGORIES.length), this.state.selected);
  }

  onUpdate = ({ translate }) => {
    console.log(`onUpdate: translate: ${translate}`);
    this.setState({ translate });
  };

  onSelect = key => {
    console.log(`onSelect: ${key}`);
    this.setState({ selected: key });
  };

  componentDidUpdate(prevProps, prevState) {
    const { alignCenter } = prevState;
    const { alignCenter: alignCenterNew } = this.state;
    if (alignCenter !== alignCenterNew) {
      this.menu.setInitial();
    }
  }

  setItemsCount = ev => {
    const { itemsCount = CATEGORIES.length, selected } = this.state;
    const val = +ev.target.value;
    const itemsCountNew =
      !isNaN(val) && val <= CATEGORIES.length && val >= 0
        ? +ev.target.value
        : CATEGORIES.length;
    const itemsCountChanged = itemsCount !== itemsCountNew;

    if (itemsCountChanged) {
      this.menuItems = Menu(CATEGORIES.slice(0, itemsCountNew), selected);
      this.setState({
        itemsCount: itemsCountNew
      });
    }
  };

  setSelected = ev => {
    const { value } = ev.target;
    this.setState({ selected: String(value) });
  };

  render() {
    const {
      alignCenter,
      clickWhenDrag,
      hideArrows,
      dragging,
      hideSingleArrow,
      itemsCount,
      selected,
      translate,
      transition,
      wheel
    } = this.state;

    const menu = this.menuItems;

    return (  
        <ScrollMenu
          ref={el => (this.menu = el)}
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          hideArrows={hideArrows}
          hideSingleArrow={hideSingleArrow}
          transition={+transition}
          onUpdate={this.onUpdate}
          onSelect={this.onSelect}
          selected={selected}
          translate={translate}
          alignCenter={alignCenter}
          dragging={dragging}
          clickWhenDrag={clickWhenDrag}
          wheel={wheel}
        />

    );
  }
}

export default ScrollBar;
