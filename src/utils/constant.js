import DashboardIcon from "@mui/icons-material/Dashboard";

export const path = {
  LOGIN_PAGE: "/auth/login",
  HOME_PAGE: "/app/dashboard",
  PLAYGROUND_PAGE: "/app/playground",
  MR_PAGE: "/app/mr",
  DOCTOR_PAGE: "/app/doctor",
  PARTY_PAGE: "/app/party",
  PRODUCT_PAGE: "/app/product"
};

export const role = {
  ADMIN: 1,
  MR: 2
};

export const STORE_LANGUAGE_KEY = "lang";
export const MenuList = [
  { label: "Dashboard", icon: DashboardIcon, path: path.HOME_PAGE },
  { label: "MR", icon: DashboardIcon, path: path.MR_PAGE },
  { label: "Product", icon: DashboardIcon, path: path.PRODUCT_PAGE },
  { label: "Doctor", icon: DashboardIcon, path: path.DOCTOR_PAGE },
  { label: "Party", icon: DashboardIcon, path: path.PARTY_PAGE }
];
