import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import StartHere from "../pages/StartHere/StartHere";
import Deposit from "../pages/Deposit/Deposit";
import Dashboard from "../pages/Dashboard/Dashboard";
import Licenses from "../pages/Licenses/Licenses";
import PurchasePlane from "../pages/PurchasePlane/PurchasePlane";
import DepositLog from "../pages/DepositLog/DepositLog";
import Login from "../pages/Register/Login";
import Register from "../pages/Register/Register";
import Wallet from "../pages/Wallet/WalletPage";
import TransitionHistory from "../pages/TransitionHistory/TransitionHistory";
import NotFound from "../pages/NotFound/NotFound";
import ProtectRoute from "../Components/ProtectRouter/ProtectRoute";
import Payment from "../pages/Payment/Payment";
import WithdrawHistory from "../pages/WithdrawHistory/WithdrawHistory";
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
import AllUser from "../pages/AllUser/AllUser";
import PlanSettings from "../pages/PlanSettings/PlanSettings";
import ChainSettings from "../pages/ChainSettings/ChainSettings";
import CouponSettings from "../pages/CouponSettings/CouponSettings";
import TokenSettings from "../pages/TokenSettings/TokenSettings";

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
        path: "all-user",
        element: <AllUser />,
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
      // {
      //   path: "start-here",
      //   element: <StartHere />,
      // },
      // {
      //   path: "deposit",
      //   element: <Deposit />,
      // },
      // {
      //   path: "wallet",
      //   element: <Wallet />,
      // },
      // {
      //   path: "payment",
      //   element: <Payment />,
      // },
      // {
      //   path: "licenses",
      //   element: <Licenses />,
      // },
      // {
      //   path: "transaction-history",
      //   element: <TransitionHistory />,
      // },
      // {
      //   path: "purchase-plan",
      //   element: <PurchasePlane />,
      // },
      // {
      //   path: "deposit-log",
      //   element: <DepositLog />,
      // },
      // {
      //   path: "withdraw-history",
      //   element: <WithdrawHistory />,
      // },
      // {
      //   path: "withdraw",
      //   element: <Withdraw />,
      // },
      // {
      //   path: "withdraw/preview/otp",
      //   element: <Otp />,
      // },
      // {
      //   path: "withdraw/preview",
      //   element: <Preview />,
      // },
      // {
      //   path: "change-password",
      //   element: <ChangePassword />,
      // },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },

  {
    path: "register",
    element: <RegisterLayout />,
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
    element: <LoginLayout />,
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
