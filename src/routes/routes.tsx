import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import StartHere from "../pages/StartHere/StartHere";
import Deposit from "../pages/Deposit/Deposit";
import Dashboard from "../pages/Dashboard/Dashboard";
import Licenses from "../pages/Licenses/Licenses";
import PurchasePlane from "../pages/PurchasePlaneHistory/PurchasePlaneHistory";
import DepositLog from "../pages/DepositLog/DepositLog";
import Login from "../pages/Register/Login";
import Register from "../pages/Register/Register";
import Wallet from "../pages/Wallet/WalletPage";
import TransitionHistory from "../pages/TransitionHistory/TransitionHistory";
import NotFound from "../pages/NotFound/NotFound";
import ProtectRoute, {
  RedirectToDashboard,
} from "../Components/ProtectRouter/ProtectRoute";
import Payment from "../pages/Payment/Payment";
import WithdrawHistory from "../pages/ClientWithdrawHistory/WithdrawHistoryistory";
import Withdraw from "../pages/Withdraw/Withdraw";
import Otp from "../pages/OtpPage/Otp";
import Preview from "../pages/Preview/Preview";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import PasswordOtp from "../pages/ResetPassword/PasswordOtp";
import SetNewPassword from "../pages/ResetPassword/SetNewPassword";
import LoginLayout from "../layouts/LoginLayout";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import RegisterOtp from "../pages/Register/RegisterOtp";
import RegisterLayout from "../layouts/RegisterLayout";
import AllUser from "../pages/AllClients/AllUsernts";
import PlanSettings from "../pages/PlanSettings/PlanSettings";
import ChainSettings from "../pages/ChainSettings/ChainSettings";
import CouponSettings from "../pages/CouponSettings/CouponSettings";
import TokenSettings from "../pages/TokenSettings/TokenSettings";
import GeneralSettings from "../pages/GeneralSettings/GeneralSettings";
import AllClients from "../pages/AllClients/AllClients";
import PurchasePlaneHistory from "../pages/PurchasePlaneHistory/PurchasePlaneHistory";
import ClientLicenseHistory from "../pages/ClientLicenseHistory/ClientLicenseHistory";
import ClientWithdrawHistory from "../pages/ClientWithdrawHistory/ClientWithdrawHistory";
import LicenseManagement from "../pages/LicenseManagement/LicenseManagement";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectRoute>
        <App />
      </ProtectRoute>
    ),
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "all-clients",
        element: <AllClients />,
      },
      {
        path: "license-management",
        element: <LicenseManagement />,
      },
      {
        path: "settings/plan",
        element: <PlanSettings />,
      },
      {
        path: "settings/chain",
        element: <ChainSettings />,
      },
      {
        path: "settings/coupon",
        element: <CouponSettings />,
      },
      {
        path: "settings/token",
        element: <TokenSettings />,
      },
      {
        path: "general-settings",
        element: <GeneralSettings />,
      },
      {
        path: "purchase-plan-history",
        element: <PurchasePlaneHistory />,
      },
      {
        path: "client-license-history",
        element: <ClientLicenseHistory />,
      },
      {
        path: "client-withdraw-history",
        element: <ClientWithdrawHistory />,
      },
    ],
  },
  {
    path: "login",
    element: (
      <RedirectToDashboard>
        {" "}
        <Login />
      </RedirectToDashboard>
    ),
  },

  {
    path: "register",
    element: (
      <RedirectToDashboard>
        <RegisterLayout />{" "}
      </RedirectToDashboard>
    ),
    children: [
      {
        path: "",
        element: <Register />,
      },
      {
        path: "register-otp",
        element: <RegisterOtp />,
      },
    ],
  },
  {
    path: "password-reset",
    element: (
      <RedirectToDashboard>
        {" "}
        <LoginLayout />{" "}
      </RedirectToDashboard>
    ),
    children: [
      {
        path: "",
        element: <ResetPassword />,
      },
      {
        path: "password-otp",
        element: <PasswordOtp />,
      },
      {
        path: "password-otp/confirm-password",
        element: <SetNewPassword />,
      },
    ],
  },
]);

export default routes;
