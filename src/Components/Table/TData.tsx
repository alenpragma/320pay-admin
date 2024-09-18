import { ReactNode } from "react";

type TDataType = {
  children?: ReactNode;
  className?: string;
};

const TData = ({ children, className }: TDataType) => {
  return (
    <td
      className={`py-2  text-start text-[16px] text-[#868B8F] whitespace-nowrap ${className}`}
    >
      <div>{children}</div>
    </td>
  );
};

export default TData;
