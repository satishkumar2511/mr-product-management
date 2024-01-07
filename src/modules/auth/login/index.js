import React from "react";
import Login from "./loginPage";
import { useLoginWithEmailMutation } from "../../../store/api/auth";
import { SetToken, ShowNotification, SetLoggedInUserDetails } from "../../../utils/helper";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { path, role } from "../../../utils/constant";

function LoginContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginWithEmail, { isLoading }] = useLoginWithEmailMutation();
  console.log("isLoading: ", isLoading);

  const getLoggedIn = async (payload) => {
    console.log("payload: ", payload);
    //SetToken(dispatch, "example");
   
    //ShowNotification('loggedIn','success')
    if (payload) {
      try {
        const { data } = await loginWithEmail(payload);
        console.log("User login data: ", data);
        console.log(data);
        if (data?.status_code === 200) {
          navigate(path.PLAYGROUND_PAGE);
          ShowNotification(data.message, "success");
          SetToken(dispatch, data.token);
          SetLoggedInUserDetails(dispatch, data.user);
          if(data.user.role_id === role.ADMIN)
          {
            navigate(path.MR_PAGE);
          }
          else{
            navigate(path.MR_PAGE);
          }
          
        }
        else{
          ShowNotification(data.message, "error");
        }
      } catch (err) {
        console.log("err: ", err);
      }
    }
       };
  return <Login onSubmit={(data) => getLoggedIn(data)} />;
}
export default LoginContainer;
