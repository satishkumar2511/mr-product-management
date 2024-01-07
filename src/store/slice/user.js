import { createSlice } from '@reduxjs/toolkit'
import { STORE_LANGUAGE_KEY } from '../../utils/constant'

const initialState = {
  token: null,
  [STORE_LANGUAGE_KEY]: '',
  loggedInUserInfo: {email :'', role_id:0,user_first_name:'',user_last_name:'',_id:''},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, actions) => {
      return {
        ...state,
        token: actions.payload,
      }
    },
    setLoggedInUserInfo: (state, actions) => {
      console.log("from reducers :" + actions.payload)
      console.log(actions.payload)
      return {
        ...state,
        loggedInUserInfo: {email :actions.payload.email, role_id:actions.payload.role_id,user_first_name:actions.payload.user_first_name,user_last_name:actions.payload.user_last_name,_id:actions.payload._id},
      }
    },
    setLanguage: (state, actions) => {
      return {
        ...state,
        [STORE_LANGUAGE_KEY]: actions.payload,
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken, setLoggedInUserInfo, setLanguage } = userSlice.actions

export default userSlice.reducer
