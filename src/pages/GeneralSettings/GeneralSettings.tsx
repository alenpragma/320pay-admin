import LogoAndFavicon from "../../Components/GeneralSettings/LogoAndFavicon";
import MetaTitleAndDescription from "../../Components/GeneralSettings/MetaTitleAndDescription";
import PaymentSettings from "../../Components/GeneralSettings/PaymentSettings";

const GeneralSettings = () => {
  return (
    <div className="pb-10">
      <LogoAndFavicon />
      <MetaTitleAndDescription />
      <PaymentSettings />
    </div>
  );
};

export default GeneralSettings;
