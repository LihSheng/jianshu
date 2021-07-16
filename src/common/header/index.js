import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { actionCreators } from "./store";
import { actionCreators as loginActionCreators } from "../../pages/login/store";
import magnifier from "../../statics/header/Magnifier.png";
import spin from "../../statics/header/Spin.png";
import { Link } from "react-router-dom";
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoRefresh,
  SearchInfoItem,
  SearchInfoList,
  SearchIcon,
  SearchInfoRefreshIcon,
} from "./style";

class Header extends Component {
  getListArea() {
    const {
      focused,
      list,
      page,
      mouseIn,
      totalPage,
      handleMouseEnter,
      handleMouseLeave,
      handleChangePage,
    } = this.props;
    //Convert Immutable data to normal data
    const newList = list.toJS();
    const pageList = [];
    if (newList.length) {
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        pageList.push(
          <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
        );
      }
    }

    if (focused || mouseIn) {
      return (
        <SearchInfo>
          <SearchInfoTitle
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Trending
            <SearchInfoRefresh
              onClick={() => handleChangePage(page, totalPage, this.spinIcon)}
            >
              <SearchInfoRefreshIcon
                ref={(icon) => {
                  this.spinIcon = icon;
                }}
                className="spin"
                src={spin}
              />
              Refresh
            </SearchInfoRefresh>
          </SearchInfoTitle>
          <SearchInfoList>{pageList}</SearchInfoList>
        </SearchInfo>
      );
    } else {
      return null;
    }
  }

  render() {
    const { focused, handleInputFocus, handleInputBlur, list, login, logout } =
      this.props;

    return (
      <HeaderWrapper>
        <Link to="/">
          <Logo />
        </Link>

        <Nav>
          <NavItem className="left active">Home Page</NavItem>
          <NavItem className="left">Download App</NavItem>
          {login ? (
            <NavItem className="right" onClick={logout}>
              Logout
            </NavItem>
          ) : (
            <Link to="/login">
              <NavItem className="right">Login</NavItem>
            </Link>
          )}

          <NavItem className="right">
            <i className="iconfont">Aa</i>
          </NavItem>

          <SearchWrapper>
            <CSSTransition in={focused} timeout={200} classNames="slide">
              <NavSearch
                className={focused ? "focused" : ""}
                onFocus={() => handleInputFocus(list)}
                onBlur={handleInputBlur}
              ></NavSearch>
            </CSSTransition>
            <span className={focused ? "focused iconfont" : " iconfont"}>
              <SearchIcon src={magnifier} />
            </span>
            {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Link to="/write">
            <Button className="writing">
              <i className="iconfont"></i>Write Article
            </Button>
          </Link>
          <Button className="reg">Register</Button>
        </Addition>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //focused: state.get('header').get('focused')
    focused: state.getIn(["header", "focused"]),
    list: state.getIn(["header", "list"]),
    page: state.getIn(["header", "page"]),
    totalPage: state.getIn(["header", "totalPage"]),
    mouseIn: state.getIn(["header", "mouseIn"]),
    login: state.getIn(["login", "login"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      list.length === 0 && dispatch(actionCreators.getList());
      dispatch(actionCreators.searchFocus());
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur());
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter());
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave());
    },
    handleChangePage(page, totalPage, spin) {
      let originAngle = spin.style.transform.replace(/[^0-9]/gi, "");
      if (originAngle) {
        originAngle = parseInt(originAngle, 10);
      } else {
        originAngle = 0;
      }
      spin.style.transform = "rotate(" + (originAngle + 360) + "deg)";

      if (page < totalPage) {
        dispatch(actionCreators.changePage(page + 1));
      } else {
        dispatch(actionCreators.changePage(1));
      }
    },
    logout() {
      dispatch(loginActionCreators.logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
