import axios from "axios";
import * as constants from "./constants";

const changeHomeData = (result) => ({
  type: constants.CHANGE_HOME_DATA,
  topicList: result.topicList,
  articleList: result.articleList,
  recommendList: result.recommendList,
});

export const getHomeInfo = () => {
  return (dispatch) => {
    axios
      .get(
        "https://f1503b61-36ef-48ca-bd0a-47da9f7a1869.mock.pstmn.io/api/home"
      )
      .then((res) => {
        const result = res.data.data;
        dispatch(changeHomeData(result));
      });
  };
};

const addHomeList = (list, nextPage) => ({
  type: constants.ADD_ARTICLE_LIST,
  list: list,
  nextPage,
});

export const getMoreList = (page) => {
  return (dispatch) => {
    axios
      .get(
        "https://f1503b61-36ef-48ca-bd0a-47da9f7a1869.mock.pstmn.io/api/homelist?page=" +
          page
      )
      .then((res) => {
        const result = res.data.data;
        dispatch(addHomeList(result, page + 1));
      });
  };
};

export const toggleTopShow = (show) => ({
  type: constants.TOGGLE_SCROLL_TOP,
  show,
});
