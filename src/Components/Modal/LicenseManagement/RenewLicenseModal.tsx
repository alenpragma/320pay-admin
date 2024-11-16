import { RxCross1 } from "react-icons/rx";
import Form from "../../Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoadingButton from "../../Loading/LoadingButton";
import InputField from "../../Forms/InputField";
import { FieldValues, SubmitHandler } from "react-hook-form";
import axiosInstance from "../../../utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SelectField from "../../Forms/SelecetField";

export const validationSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.string().min(1, "This field is required"),
});

export type IProps = {
  renewModal: boolean;
  handleRenewModal: (id: string) => void;
};
const RenewLicenseModal = ({ renewModal, handleRenewModal }: IProps) => {
  const [filterUserData, setFilterUserData] = useState([]);
  const [filterDomain, setFilterDomain] = useState([]);
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  const fetchData = async () => {
    const [allusers, plans, license] = await Promise.all([
      axiosInstance.get(`/client-lists`),
      axiosInstance.get(`/client/packages`),
      axiosInstance.get(`/admin/license-history`),
    ]);
    return {
      allusers: allusers.data,
      plans: plans.data,
      license: license.data,
    };
  };
  const { data: data } = useQuery({
    queryKey: ["allUsers", "plans", "license"],
    queryFn: fetchData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  const allusers = data?.allusers?.data;
  const allPlans = data?.plans?.packages;
  const license = data?.license?.data?.data;

  const option =
    allPlans?.map((item: { id: string; package_name: string }) => ({
      label: item.package_name,
      value: item.id,
    })) || [];

  const allDomain =
    filterDomain?.map((item: { id: string; domain_name: string }) => ({
      label: item.domain_name,
      value: item.id,
    })) || [];

  const handleEmailChange = (change: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = change.target.value;
    if (inputValue.endsWith("@gmail.com")) {
      const filteredData = allusers?.filter(
        (item: { email: string }) => item?.email === inputValue
      );
      const filterDomain = license?.filter(
        (item: { email: string }) => item?.email === inputValue
      );
      if (filterDomain) {
        setFilterDomain(filterDomain);
      }
      if (filteredData) {
        setFilterUserData(filteredData);
      }
    } else {
      setFilterUserData([]);
      setFilterDomain([]);
    }
  };

  return (
    <div className="w-full">
      <div
        className={` ${
          renewModal
            ? " opacity-100 fixed bg-[#07070745] w-full h-screen z-[100] right-0 top-0 bottom-0 m-auto "
            : "opacity-0 -z-50"
        }`}
        onClick={() => handleRenewModal("")}
      ></div>
      <div
        className={`fixed  md:w-2/5 w-full h-fit m-auto right-0 left-0 top-0 rounded px-3 ${
          renewModal
            ? "bottom-10 opacity-100  duration-300 z-[101]"
            : "bottom-0 opacity-0 duration-300 pointer-events-none"
        }`}
      >
        <div className="w-full h-fit rounded bg-[#ffffff] ">
          <div className="w-full py-3 px-5 bg-primary text-white font-semibold text-[20px] flex justify-between items-center rounded-t">
            <h4>Renew License</h4>
            <RxCross1
              onClick={() => handleRenewModal("")}
              className="cursor-pointer hover:scale-105"
            />
          </div>
          <div className="px-5 pb-10 pt-8 max-h-[500px] overflow-auto">
            <Form
              onSubmit={formSubmit}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                name: "",
                email: "",
              }}
            >
              <div className="md:w-11/12 w-full mx-auto">
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">Client</p>
                  <InputField
                    name="client"
                    type="text"
                    className="px-2"
                    placeholder="Set Client"
                    onChange={handleEmailChange}
                  />
                  <div className="size-6 p-[3px] border border-slate-300 rounded-full absolute right-3 top-8">
                    {filterUserData?.length !== 0 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#5734DC"
                        className="size-full"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    ) : (
                      <RxCross1 className="size-full text-red-500 " />
                    )}
                  </div>
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    Selected Plan
                  </p>
                  <SelectField
                    name="visible_status"
                    options={option}
                    type="string"
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    Domain Name
                  </p>
                  <SelectField
                    name="domain"
                    options={allDomain}
                    type="string"
                    required
                  />
                </div>
                <LoadingButton className="w-full mt-10">Update License</LoadingButton>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewLicenseModal;
