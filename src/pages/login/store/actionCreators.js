import axios from "axios";
import * as constants from "./constants";

const changeLogin = () => ({
  type: constants.CHANGE_LOGIN,
  value: true,
});

export const logout = () => ({
  type: constants.LOGOUT,
  value: false,
});

export const login = (account, password) => {
  return (dispatch) => {
    //Not a good practice to use GET, normally use POST
    axios
      .get(
        "https://f1503b61-36ef-48ca-bd0a-47da9f7a1869.mock.pstmn.io/api/login?account=" +
          account +
          "&password=" +
          password
      )
      .then((res) => {
        const result = res.data.data;
        if (result) {
          dispatch(changeLogin());
        } else {
          alert("Failed");
        }
      });
  };
};
