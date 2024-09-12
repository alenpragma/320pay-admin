export const getPaymentaToken = () => {
  const token = localStorage.getItem("paymentaToken")
  return token
}

export const setPaymentaToken = (token: string) => {
  localStorage.setItem("paymentaToken", token)
}

export const removePaymentaToken = () => {
  localStorage.removeItem("paymentaToken")
}
