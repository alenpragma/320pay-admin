import { ethers } from "ethers";
export const wallet = {}
export const createWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  return wallet;
};
