import { useQuery } from "@tanstack/react-query";
import LogoAndFavicon from "../../Components/GeneralSettings/LogoAndFavicon";
import MetaTitleAndDescription from "../../Components/GeneralSettings/MetaTitleAndDescription";
import PaymentSettings from "../../Components/GeneralSettings/PaymentSettings";
import axiosInstance from "../../utils/axiosConfig";

const GeneralSettings = () => {
  const fetchLogoAndFavicon = async () => {
    const response = await axiosInstance.get("/settings");
    return response;
  };

  const { data: logoFavicon, refetch, isLoading } = useQuery({
    queryKey: ["logoFavicon"],
    queryFn: fetchLogoAndFavicon,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const userInformation = logoFavicon?.data?.[0];

  return (
    <div className="pb-10">
      <LogoAndFavicon userInformation={userInformation} refetch={refetch} />
      <MetaTitleAndDescription
        userInformation={userInformation}
        refetch={refetch}
      />
      <PaymentSettings userInformation={userInformation} refetch={refetch} isLoading={isLoading} />
    </div>
  );
};

export default GeneralSettings;
