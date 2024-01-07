import { useSelector } from "react-redux";
import { setLanguage, setToken, setLoggedInUserInfo } from "../store/slice/user";
import { STORE_LANGUAGE_KEY } from "./constant";
import { DEFAULT_LANGUAGE } from "./config";
import { toast } from "react-toastify";

export const SetToken = (dispatch, token) => {
  localStorage.setItem("token", token);
  dispatch(setToken(token));
};
export const GetToken = () => localStorage.getItem("token");
// useSelector((state) => state.user.token) ||

export const SetLoggedInUserDetails = (dispatch, user) => {
  localStorage.setItem("loggedInUser", JSON.stringify({email :user.email, role_id:user.role_id,user_first_name:user.user_first_name,user_last_name:user.user_last_name,_id:user._id}));
  dispatch(setLoggedInUserInfo(user));
}; 

export const GetLoggedInUserDetails = () => localStorage.getItem("loggedInUser");

export const TokenFromState = () =>  useSelector((state) => state.user.token);
export const RemoveToken = () => localStorage.removeItem("token");
export const clearLocalStorage = () => localStorage.clear();

export const userLogout = () => {
  RemoveToken();
  window.location.replace("/");
  // window.location.reload()
};

export const SetLanguage = (dispatch, lang) => {
  localStorage.setItem(STORE_LANGUAGE_KEY, lang);
  dispatch(setLanguage(lang));
};

export const GetLanguage = () =>
  useSelector(
    (state) =>
      state.user[STORE_LANGUAGE_KEY] ||
      localStorage.getItem(STORE_LANGUAGE_KEY) ||
      DEFAULT_LANGUAGE
  );

//toaster messages
const curMsgs = {};
export const ShowNotification = (
  message,
  type,
  timeOut = 3000,
  position = toast.POSITION.TOP_RIGHT
) => {
  if (curMsgs[message]) {
    toast.update(curMsgs[message], {
      type, // allowed types ["info","success","warning","error","default"]
      autoClose: timeOut,
      hideProgressBar: false,
      position,
      draggable: false,
      closeOnClick: false,
      onClose: () => {
        delete curMsgs[message];
      },
    });
    return curMsgs[message];
  }
  curMsgs[message] = toast(`${message}`, {
    type, // allowed types ["info","success","warning","error","default"]
    autoClose: timeOut,
    hideProgressBar: false,
    position,
    draggable: false,
    closeOnClick: false,
    onClose: () => {
      delete curMsgs[message];
    },
  });
  return curMsgs[message];
};
