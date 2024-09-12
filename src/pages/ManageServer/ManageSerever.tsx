import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageServer = () => {
  const [position, setPosition] = useState(0); // Initial position of the slider
  const [isSliding, setIsSliding] = useState(false);
  const maxPosition = 200; // Adjust this value based on your layout
  const navigate = useNavigate();

  useEffect(() => {
    if (position === maxPosition) {
      setIsSliding(false); // Stop sliding when reaching the max position
      // Set a delay to navigate to the new route, allowing the transition to finish
      setTimeout(() => {
        navigate("/your-route"); // Replace "/your-route" with your actual route
      }, 300); // Match this duration with the CSS transition duration
    }
  }, [position, navigate]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const initialX = e.clientX;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = Math.min(
        maxPosition,
        Math.max(0, e.clientX - initialX + position)
      );
      setPosition(newPosition);
    };

    const handleMouseUp = () => {
      if (position < maxPosition) {
        setIsSliding(true);
        setPosition(0); // Reset position to 0 with a smooth transition
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="relative w-[255px] h-14 bg-primary rounded-lg flex items-center">
      <div
        className={`absolute left-1 flex items-center justify-center size-12 bg-white rounded-lg cursor-pointer ${
          isSliding ? "transition-transform duration-300 ease-out" : ""
        }`}
        style={{ transform: `translateX(${position}px)` }}
        onMouseDown={handleMouseDown}
      >
        <svg
          className="w-6 h-6 text-black"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="pl-20 text-secondary">Slide This Arrow</div>
    </div>
  );
};

export default ManageServer;
