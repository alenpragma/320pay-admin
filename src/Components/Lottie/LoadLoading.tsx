import Lottie from "lottie-react"
import { loading, loadingLotti } from "../.."

const LoadLoading = () => {
  return (
    <Lottie
      loop
      animationData={loadingLotti}
      style={{ width: 100, height: 50 }}
      className="mx-auto flex justify-center"
    />
  )
}

export default LoadLoading
