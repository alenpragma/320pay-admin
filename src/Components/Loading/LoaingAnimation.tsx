import { PuffLoader } from "react-spinners";

type IProps = {
  color?: string;
  size?: number
};
const LoadingAnimation = ({ color, size }: IProps) => {
  return (
    <div className="w-full py-1">
      <PuffLoader className="mx-auto" color={color} size={size} />
    </div>
  );
};

export default LoadingAnimation;
