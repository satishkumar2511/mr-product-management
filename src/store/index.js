import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import userSlice from './slice/user'
import { appApi } from './appApi'
import { ShowNotification } from '../utils/helper'



const globalErrorHandlerMiddleware = () => (next) => async (action) => {
  //sconsole.log('action: ', action)
  // const currentLocation = window.location.href
  // const isLogin =
  //   currentLocation?.includes('login') || currentLocation?.includes('signup')

  if (isRejectedWithValue(action)) {
   // let message = 'something went wrong'
    // if (action?.payload?.status === 422) {
    //   message = action.payload?.data?.detail[0]?.msg
    // } else if (action?.payload?.status === 400) {
    //   message = action.payload?.data?.detail
    // } else if (action?.payload?.status === 401) {
    //   message = action.payload?.data?.detail[0]
    //   if (!isLogin) userLogout()
    // }
   // message && ShowNotification(message, 'error')
  } else if (action?.payload?.status_code === 400) {
    const message = action?.payload?.message
    message && ShowNotification(message, 'error')
  }
  // else if (action?.payload?.status_code === 200) {
  //   const message = action?.payload?.message
  //   message && ShowNotification(message, 'success')
  // }
  return next(action)
}

export const store = configureStore({
  reducer: {
    user: userSlice,
    [appApi.reducerPath]: appApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(appApi.middleware)
    .concat(globalErrorHandlerMiddleware),
})
setupListeners(store.dispatch)
