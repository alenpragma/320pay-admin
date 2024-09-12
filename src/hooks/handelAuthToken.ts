export const getPaymentaToken = () => {
  const token = localStorage.getItem("paymentAdminToken")
  return token
}

export const setPaymentaToken = (token: string) => {
  localStorage.setItem("paymentAdminToken", token)
}

export const removePaymentaToken = () => {
  localStorage.removeItem("paymentAdminToken")
}
