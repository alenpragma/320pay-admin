import React from "react";

const TableBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" rounded-xl border-2 border-[#E2E2E9] pb-4 mt-4">
      <div className="overflow-x-auto w-full">{children}</div>
    </div>
  );
};

export default TableBody;
