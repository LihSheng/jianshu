import axios from "axios";
import * as constants from "./constants";

const changeDetail = (title, content) => ({
  type: constants.CHANGE_DETAIL,
  title,
  content,
});

export const getDetail = (id) => {
  return (dispatch) => {
    axios
      .get(
        "https://f1503b61-36ef-48ca-bd0a-47da9f7a1869.mock.pstmn.io/api/detail?id=" +
          id
      )
      .then((res) => {
        const result = res.data.data;
        dispatch(changeDetail(result.title, result.content));
      })
      .catch(() => {});
  };
};
