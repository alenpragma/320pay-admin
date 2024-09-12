import React from "react";
import TData from "../../Components/Table/TData";
import Form from "../../Components/Forms/Form";
import InputField from "../../Components/Forms/InputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";

import { GoSearch } from "react-icons/go";
import TableBody from "../../Components/TableBody/TableBody";
export const validationSchema = z.object({
  search: z.string().min(3, "Please type minimum 3 word"),
});
const AllUser = () => {
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  return (
    <div className="py-6">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-cblack mb-5">Total User : 4564</h4>
        <Form
          onSubmit={formSubmit}
          resolver={zodResolver(validationSchema)}
          defaultValues={{
            search: "",
          }}
        >
          <div className="relative md:w-[3d00px] w-full">
            <InputField
              name="search"
              type="text"
              className="w-full border border-[#E2E2E9] focus:outline focus:outline-slate-500 rounded-md px-3 py-1"
              placeholder="Search...."
            />
            <GoSearch className="absolute size-6 top-1 right-2 text-cslate" />
          </div>
        </Form>
      </div>

      <TableBody>
        <table className=" border-collapse w-full">
          <thead>
            <tr className="bg-[#e2e2e965] text-cslate rounded-tl-lg">
              <th className="py-2 px-6 text-start rounded-tl-lg ">Joind</th>
              <th className="py-2 px-6 text-start">User Name</th>
              <th className="py-2 px-6 text-start">Client Id</th>
              <th className="py-2 px-6 text-start">License/expired</th>
              <th className="py-2 px-6 text-start">Deposit</th>
              <th className="py-2 px-6 text-start">Withdraw</th>
              <th className="py-2 px-6 text-start">Purchase</th>
              <th className="py-2 px-6 text-start rounded-tr-lg ">Balance</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            <TData className="px-6">12/02/2024</TData>
            <TData className="px-6">Mr. Alex</TData>
            <TData className="px-6">Rt8403d</TData>
            <TData className="px-6">12/3</TData>
            <TData className="px-6">$500</TData>
            <TData className="px-6">$250</TData>
            <TData className="px-6">$145</TData>
            <TData className="px-6">$565</TData>
          </tbody>
        </table>
      </TableBody>
    </div>
  );
};

export default AllUser;
