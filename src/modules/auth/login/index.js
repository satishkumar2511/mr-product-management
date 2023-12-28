import React from "react";
import Login from "./loginPage";
import { useLoginWithEmailMutation } from "../../../store/api/auth";
import { SetToken, ShowNotification } from "../../../utils/helper";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { path } from "../../../utils/constant";

function LoginContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginWithEmail, { isLoading }] = useLoginWithEmailMutation();
  console.log("isLoading: ", isLoading);

  const getLoggedIn = async (payload) => {
    console.log("payload: ", payload);
    SetToken(dispatch, "example");
    navigate(path.PLAYGROUND_PAGE);
    ShowNotification('loggedIn','success')
    if (payload) {
      try {
        const { data } = await loginWithEmail(payload);
        if (data?.status_code === 200) {
          ShowNotification(data.message, "success");
          SetToken(dispatch, "example");
          navigate(path.PLAYGROUND_PAGE);
        }
      } catch (err) {
        console.log("err: ", err);
      }
    }
       };
  return <Login onSubmit={(data) => getLoggedIn(data)} />;
}
export default LoginContainer;
