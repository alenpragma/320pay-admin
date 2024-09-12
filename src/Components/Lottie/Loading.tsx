import Lottie from "lottie-react"
import { loading } from "../.."

const Loading = () => {
  return (
    <Lottie
      loop
      animationData={loading}
      style={{ width: 100, height: 100 }}
      className="mx-auto flex justify-center"
    />
  )
}

export default Loading
