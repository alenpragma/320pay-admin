import { MenuInterface } from "./types/menuType"

import home from "./assets/icon/navIcon/home.svg"
import homeHover from "./assets/icon/navIcon/home-hover.svg"
import lighting from "./assets/icon/navIcon/lighting.svg"
import lightingHover from "./assets/icon/navIcon/lightin-hover.svg"
import wallet from "./assets/icon/navIcon/wallet.svg"
import walletHover from "./assets/icon/navIcon/wallet-hover.svg"
import filelock from "./assets/icon/navIcon/file-lock.svg"
import filelockHover from "./assets/icon/navIcon/file-lock-hover.svg"

import layers from "./assets/icon/navIcon/layers.svg"
import layerHover from "./assets/icon/navIcon/layers-hover.svg"
import clock from "./assets/icon/navIcon/clock.svg"
import clockHover from "./assets/icon/navIcon/clock-hover.svg"
import domain from "./assets/icon/navIcon/server.svg"
import domainHover from "./assets/icon/navIcon/server-hover.svg"
import gift from "./assets/icon/navIcon/gift.svg"
import giftHover from "./assets/icon/navIcon/gift-hover.svg"
import smile from "./assets/icon/navIcon/smiley.svg"
import smileHover from "./assets/icon/navIcon/smiley-hover.svg"
import deposit from "./assets/icon/navIcon/deposit.svg"
import depositHover from "./assets/icon/navIcon/deposit-hover.svg"
import transaction from "./assets/icon/navIcon/transactin.svg"
import transactionHover from "./assets/icon/navIcon/transaction-hover.svg"
import withdrow from "./assets/icon/navIcon/withdraw.svg"
import withdrowHover from "./assets/icon/navIcon/withdraw-hover.svg"
import settings from "./assets/icon/navIcon/settings.svg"
import settingsHover from "./assets/icon/navIcon/settings-hover.svg"
import payment from "./assets/icon/navIcon/payment.svg"
import paymentHover from "./assets/icon/navIcon/payment-hover.svg"
import withdraw1 from "./assets/icon/navIcon/withdraw1.svg"
import withdraw1Hover from "./assets/icon/navIcon/withdraw-hover1.svg"

import file from "./assets/icon/dashboard/file.svg"
import wallet2 from "./assets/icon/dashboard/wallet-2.svg"
import profile from "./assets/icon/dashboard/profile.svg"
import { CadeInterface, CadeInterface2 } from "./types/dashboardType"

import trophy from "./assets/icon/dashboard/trophy.svg"
import shield from "./assets/icon/dashboard/shield-quartered.svg"
import ticket from "./assets/icon/dashboard/ticket.svg"
import dWallet from "./assets/icon/dashboard/wallet.svg"

import qrCode from "./assets/image/diposit/qr-code.png"
import loginImage from "./assets/image/login/login.png"

import logo from "./assets/image/logo/logo-2.png"

import tick from "./assets/icon/Starthere/tick.svg"

import lottie from "./assets/lottie/loading.json"
import loadingLottie from "./assets/lottie/loading-lottie.json"
import rightArrowAnimation from "./assets/lottie/right-arrow.json"

export const loading = lottie
export const loadingLotti = loadingLottie
export const rightArrowA = rightArrowAnimation

import usdt from "./assets/icon/payment/usdt.svg"

import bnb from "./assets/icon/dashboard/bnb.svg"
import usdts from "./assets/icon/dashboard/usdt.svg"
import musd from "./assets/icon/dashboard/musd.svg"
import mind from "./assets/icon/dashboard/mind.svg"

import rightArrow from "./assets/icon/withdraw/right-slide.svg"

import wallet1 from "./assets/icon/dashboard/wallet2.svg" 

export const walletHistory = [
  {
    id: "012",
    transition_History: "0x3cFbca23e190e8E29626aBd81cD9AD1C57c9f3BA",
    wallletHistory: "0x3cFbca23e190e8E29626aB234",
  },
  {
    id: "013",
    transition_History: "0x3cFbca23e190e8E29626aBd81cD9AD1C57c9f345",
    wallletHistory: "0x3cFbca23e190e8E29626aB56",
  },
  {
    id: "014",
    transition_History: "0x3cFbca23e190e8E29626aBd81cD9AD1C57c9fjhg",
    wallletHistory: "0x3cFbca23e190e8E29626aB456",
  },
  {
    id: "015",
    transition_History: "0x3cFbca23e190e8E29626aBd81cD9AD1C57c9f980",
    wallletHistory: "0x3cFbca23e190e8E29626aB123",
  },
  {
    id: "016",
    transition_History: "0x3cFbca23e190e8E29626aBd81cD9AD1C57c9f8796",
    wallletHistory: "0x3cFbca23e190e8E29626aB890",
  },
]

export const mainNavItem: MenuInterface[] = [

  {
    id: 113,
    pathname: "/dashboard/all-user",
    item: "All User",
    icon1: lighting,
    icon2: lightingHover,
  },
  {
    id: 114,
    pathname: "/dashboard/deposit",
    item: "Deposit",
    icon1: deposit,
    icon2: depositHover,
  },
  {
    id: 114,
    pathname: "/dashboard/licenses",
    item: "Licenses",
    icon1: filelock,
    icon2: filelockHover,
  },
  {
    id: 115,
    pathname: "/dashboard/wallet",
    item: "Wallet",
    icon1: wallet,
    icon2: walletHover,
  },
]
export const subNavItem: MenuInterface[] = [
  {
    id: 221,
    pathname: "/dashboard/purchase-plan",
    item: "Purchase Plan",
    icon1: layers,
    icon2: layerHover,
  },
  {
    id: 224,
    pathname: "/dashboard/transaction-history",
    item: "Transaction History",
    icon1: transaction,
    icon2: transactionHover,
  },
  {
    id: 225,
    pathname: "/dashboard/withdraw-history",
    item: "Withdraw History",
    icon1: withdrow,
    icon2: withdrowHover,
  },
  {
    id: 226,
    pathname: "/dashboard/raise-ticket",
    item: "Raise Ticket",
    icon1: smile,
    icon2: smileHover,
  },
]

export const submenuItem: MenuInterface[] = [
  {
    id: 311,
    pathname: "settings/plan",
    item: "Plan Settings",
    icon1: payment,
    icon2: paymentHover,
  },
  {
    id: 312,
    pathname: "settings/chain",
    item: "Chain Settings",
    icon1: withdraw1,
    icon2: withdraw1Hover,
  },
  {
    id: 313,
    pathname: "settings/coupon",
    item: "Coupon Settings",
    icon1: withdraw1,
    icon2: withdraw1Hover,
  },
]
export const dashboardCard: CadeInterface[] = [
  {
    img: profile,
    title: "Your Client Id",
    secretCode: "45",
  },
  {
    img: dWallet,
    name: "wallet",
    title: "Your Balance",
    secretCode: "5000",
  },
  {
    img: wallet2,
    name: "wallet",
    title: "Wallet",
    secretCode: "12/24",
  },
]

export const dashboardCard2: CadeInterface2[] = [
  {
    img: trophy,
    title: "Orders",
    number: "96",
  },
  {
    img: shield,
    title: "Domain",
    number: "96",
  },
  {
    img: file,
    title: "Your Logins",
    number: "12/15",
  },
  {
    img: ticket,
    title: "Tickets",
    number: "96",
  },
]

type TTable = { table: boolean; status: boolean }
export const tableData: TTable[] = [
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: false },
  { table: true, status: true },
  { table: true, status: false },
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: false },
  { table: true, status: false },
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: true },
  { table: true, status: true },
]

export const PlanData = [
  {
    plan: "Small",
    price: [
      {
        price: "80",
        duration: "1 Month",
      },
    ],
    feature: {
      featureOne: "All-Chains",
      featureTwo: "Unlimited Account",
      featureThree: "Limited Customer Support",
    },
  },
  {
    plan: "Starter",
    price: [
      {
        price: "225",
        duration: "3 Month",
      },
    ],
    feature: {
      featureOne: "All-Chains",
      featureTwo: "Unlimited Account",
      featureThree: "Limited Customer Support",
    },
    save: "6.03",
  },
  {
    plan: "Basic",
    price: [
      {
        price: "2250",
        duration: "Life Time",
      },
    ],
    feature: {
      featureOne: "All-Chains",
      featureTwo: "Unlimited Account",
      featureThree: "Limited Customer Support",
    },
    save: "18",
  },
  {
    plan: "Basic",
    price: [
      {
        price: "780",
        duration: "1 Years",
      },
    ],
    feature: {
      featureOne: "All-Chains",
      featureTwo: "Unlimited Account",
      featureThree: "Limited Customer Support",
    },
    save: "150",
  },
]
export const images = {
  home,
  homeHover,
  profile,
  trophy,
  shield,
  file,
  ticket,
  qrCode,
  loginImage,
  logo,
  wallet2,
  tick,
  usdt,
  usdts,
  mind,
  bnb,
  musd,
  settings,
  settingsHover,
  rightArrow,
  wallet1
}
