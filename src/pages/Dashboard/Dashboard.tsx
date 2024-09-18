import { useEffect, useState } from "react"
import DashboardCardOne from "../../Components/dashboard/DashboardCardOne"
import DashboardTable from "../../Components/dashboard/DashboardTable"
import axiosInstance from "../../utils/axiosConfig"

const Dashboard = () => {
  const [clientWallets, setClientWallets] = useState<any>()
  const [clientProfile, setClientProfile] = useState()

  const getData = async () => {
    const response = await axiosInstance.get("/client-profile")
    if (response?.data?.success == 200) {
      setClientProfile(response?.data?.profile)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  const getWalletData = async () => {
    const response = await axiosInstance.get("/client-wallets")
    if (response?.data?.success == 200) {
      setClientWallets(response?.data?.data)
    }
  }
  useEffect(() => {
    getWalletData()
  }, [])

  useEffect(() => {
    if (clientWallets) {
      localStorage.setItem(
        "client_wallet_address",
        clientWallets?.client_wallet_address
      )
    }
  }, [clientWallets])

  // balance slider

  const [wallets, setWallets] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [totalBalance, setTotalBalance] = useState()

  const getWalletbalanceData = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get("/client-tokens")
      if (response?.data?.success === 200) {
        setWallets(response?.data?.data)
        setTotalBalance(response?.data?.total_balance)
      }
    } catch (error) {
      // console.error("Failed to fetch wallet data:", error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getWalletbalanceData()
  }, [])

  return (
    <div className="md:p-6 px-3 space-y-5 pt-4">
      <DashboardCardOne
        clientProfile={clientProfile}
        totalBalance={totalBalance}
      />
      {/* <DashboardTable /> */}
    </div>
  )
}

export default Dashboard
