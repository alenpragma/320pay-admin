import { ReactNode } from "react";

type TDataType = {
  data?: string | null | number;
  children?: ReactNode;
  className?: string;
};

const TData = ({ data, children, className }: TDataType) => {
  return (
    <td
      className={`py-2  text-start text-[16px] text-[#868B8F] whitespace-nowrap ${className}`}
    >
      <h4>{data}</h4>
      <p>{children}</p>
    </td>
  );
};

export default TData;
