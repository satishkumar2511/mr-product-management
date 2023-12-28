import { createSlice } from '@reduxjs/toolkit'
import { STORE_LANGUAGE_KEY } from '../../utils/constant'

const initialState = {
  token: null,
  [STORE_LANGUAGE_KEY]: '',
  loggedInUserInfo: {},
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
      return {
        ...state,
        loggedInUserInfo: actions.payload,
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
