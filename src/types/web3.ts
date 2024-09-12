export type ITransaction = {
  status: string | number
  message: string
  value: number
  to: string
  from: string
  hash: string
  token_name: string
  token_symbol: string
  gas: string
  gasPrice: string
  timestamp: string
}

export type ITokenData = {
  rpc_chain: string
  chainID: string
  chain_symbol: string
  token_name: string
  token_symbol: string
  image: string
  created_at: string
  id: number
  balance: number
}
