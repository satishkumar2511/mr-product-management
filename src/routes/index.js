import { path } from '../utils/constant'
import LoginContainer from '../modules/auth/login'
import DashboardContainer from '../modules/app/home'
import { GetToken } from '../utils/helper'
import PlaygroundContainer from '../modules/app/playground'
import MRContainer from '../modules/app/mr'
import DoctorContainer from '../modules/app/doctor'
import PartyContainer from '../modules/app/party'
import ProductContainer from '../modules/app/product'
import FileUploadContainer from '../modules/app/uploadFile'

const Routes = () => {
  const userToken = GetToken()
  const guestRoutes = [{ path: path.LOGIN_PAGE, component: LoginContainer }]
  const authRoutes = [
    {
      path: path.PLAYGROUND_PAGE,
      component: PlaygroundContainer,
      isAuth: true,
    },
    { path: path.HOME_PAGE, component: DashboardContainer, isAuth: true },
    { path: path.MR_PAGE, component: MRContainer, isAuth: true },
    { path: path.DOCTOR_PAGE, component: DoctorContainer, isAuth: true },
    { path: path.PARTY_PAGE, component: PartyContainer, isAuth: true },
    { path: path.PRODUCT_PAGE, component: ProductContainer, isAuth: true },
    { path: path.UploadFile_PAGE, component: FileUploadContainer, isAuth: true },
  ]

  return userToken ? authRoutes : guestRoutes
}
export default Routes
