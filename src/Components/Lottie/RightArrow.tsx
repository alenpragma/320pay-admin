import Lottie from "lottie-react"
import { rightArrowA } from "../.."
const RightArrow = () => {
  return (
    <Lottie
      loop
      animationData={rightArrowA}
      style={{ width: 100, height: 30 }}
      className="mx-auto flex justify-center"
    />
  )
}

export default RightArrow
