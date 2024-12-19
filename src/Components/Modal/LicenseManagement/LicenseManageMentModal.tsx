import { RxCross1 } from "react-icons/rx";
import Form from "../../Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoadingButton from "../../Loading/LoadingButton";
import InputField from "../../Forms/InputField";
import { FieldValues, SubmitHandler } from "react-hook-form";
import axiosInstance from "../../../utils/axiosConfig";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SelectField from "../../Forms/SelecetField";
import Swal from "sweetalert2";
import LoadingAnimation from "../../Loading/LoaingAnimation";

export const validationSchema = z.object({
  client_id: z.string().min(1, "This field is required"),
  package_id: z.number().min(1, "This field is required"),
  domain_name: z.string().min(1, "This field is required"),
});

export type IProps = {
  modal: boolean;
  handleModal: (id: string) => void;
};
const LicenseManageMentModal = ({ modal, handleModal }: IProps) => {
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
    queryKey: ["allUsers", "plans", "licensHistory"],
    queryFn: fetchData,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  const allusers = data?.allusers?.data;
  const allPlans = data?.plans?.packages;
  const licenseHistory = data?.license?.data?.data;

  const [filterUserData, setFilterUserData] = useState([]);
  const [domainData, setDomainData] = useState([]);
  const [userId, setUserId] = useState();

  const handleEmailChange = (change: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = change.target.value;
    const filterData = licenseHistory?.filter(
      (item: { email: string }) => item?.email === inputValue
    );
    setDomainData(filterData);
    if (
      inputValue.endsWith("@gmail.com") ||
      inputValue.endsWith("@roamcoin.io") ||
      inputValue.endsWith("@cellprotocol.us")
    ) {
      const filteredData = allusers?.filter(
        (item: { email: string }) => item?.email === inputValue
      );

      const id = filteredData[0]?.id;
      setUserId(id);
      if (filteredData) {
        setFilterUserData(filteredData);
      }
    } else {
      setFilterUserData([]);
    }
  };

  const domainOption = domainData?.map((item: { domain_name: string }) => ({
    label: item.domain_name,
    value: item.domain_name,
  }));
  const option = allPlans?.map(
    (item: { package_name: string; id: number }) => ({
      label: item.package_name,
      value: item.id,
    })
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async (licenseData: FieldValues) => {
      return;
      const response = await axiosInstance.post(
        "/admin/add-new-license",
        licenseData
      );
      return response.data;
    },
    onSuccess: (data: any) => {
      if (data?.success == 200) {
        Swal.fire({
          title: "Successfully",
          icon: "success",
          customClass: {
            popup: "custom-swal-modal login-swall",
          },
        });
      }
    },
  });

  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    const result = await Swal.fire({
      text: "Are you sure to add new license?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "custom-swal-modal",
      },
    });
    if (result.isConfirmed) {
      const filterData = {
        ...data,
        client_id: userId,
      };
      mutate(filterData);
    }
  };

  return (
    <div className="w-full">
      <div
        className={` ${
          modal
            ? " opacity-100 fixed bg-[#07070745] w-full h-screen z-[100] right-0 top-0 bottom-0 m-auto "
            : "opacity-0 -z-50"
        }`}
        onClick={() => handleModal("")}
      ></div>
      <div
        className={`fixed  md:w-2/5 w-full h-fit m-auto right-0 left-0 top-0 rounded px-3 ${
          modal
            ? "bottom-10 opacity-100  duration-300 z-[101]"
            : "bottom-0 opacity-0 duration-300 pointer-events-none"
        }`}
      >
        <div className="w-full h-full rounded bg-[#ffffff] ">
          <div className="w-full py-3 px-5 bg-primary text-white font-semibold text-[20px] flex justify-between items-center rounded-t">
            <h4>Add New License</h4>
            <RxCross1
              onClick={() => handleModal("")}
              className="cursor-pointer hover:scale-105"
            />
          </div>
          <div className="px-5 pb-20 pt-8 max-h-[500px] overflow-auto">
            <Form
              onSubmit={formSubmit}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                client_id: "",
                package_id: "",
                domain_name: "",
              }}
            >
              <div className="md:w-11/12 w-full mx-auto">
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">Client</p>
                  <InputField
                    name="client_id"
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
                    name="package_id"
                    options={option}
                    type="number"
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <p className="font-semibold text-secondary mb-1">
                    Domain Name
                  </p>
                  <SelectField
                    name="domain_name"
                    options={domainOption}
                    type="string"
                    required
                  />
                </div>
                <div className="w-full mt-6 border border-slate-300 rounded-lg">
                  {isPending ? (
                    <LoadingAnimation size={30} color="#36d7b7" />
                  ) : (
                    <LoadingButton className="w-full">
                      Create License
                    </LoadingButton>
                  )}
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseManageMentModal;
