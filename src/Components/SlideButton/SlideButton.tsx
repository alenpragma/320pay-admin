import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import RightArrow from "../Lottie/RightArrow"

interface SlideButtonProps {
  onSubmit: () => any
}

const SlideButton: React.FC<SlideButtonProps> = ({ onSubmit }: any) => {
  const [position, setPosition] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const [maxPosition, setMaxPosition] = useState(0)
  const navigate = useNavigate()

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMaxPosition = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const buttonWidth = 48 // Width of the sliding button
        setMaxPosition(containerWidth - buttonWidth - 10) // Adjust for padding/margins if necessary
      }
    }

    updateMaxPosition()
    window.addEventListener("resize", updateMaxPosition)

    return () => window.removeEventListener("resize", updateMaxPosition)
  }, [])

  useEffect(() => {
    if (position === maxPosition) {
      setIsSliding(false)
      setTimeout(() => {
        onSubmit()
        navigate("/dashboard/withdraw/preview")
      }, 300)
    }
  }, [position, maxPosition, onSubmit])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const initialX = e.clientX - position // Adjust for the current position

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = Math.min(
        maxPosition,
        Math.max(0, e.clientX - initialX)
      )

      setPosition(newPosition)
    }

    console.log(position)

    const handleMouseUp = () => {
      if (position < maxPosition) {
        console.log(position, maxPosition)

        setIsSliding(true)
        // setPosition(0) // Slide back to start if not fully slid
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <div
      ref={containerRef}
      className="relative h-14 bg-primary rounded-lg flex items-center w-1/2 mx-auto"
    >
      <div className="absolute left-6">
        <RightArrow />
      </div>
      <div
        className={`absolute left-1 flex items-center justify-center h-full bg-white rounded-lg cursor-pointer ${
          isSliding ? "transition-transform duration-300 ease-out" : ""
        }`}
        style={{ width: "48px", transform: `translateX(${position}px)` }}
        onMouseDown={handleMouseDown}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.4 5.8L19 11.4L13.4 17M5 5.8L10.6 11.4L5 17"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="text-center w-full text-secondary">Slide This Arrow</div>
    </div>
  )
}

export default SlideButton
