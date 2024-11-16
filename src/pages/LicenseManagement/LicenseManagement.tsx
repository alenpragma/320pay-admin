import { useState } from "react";
import LicenseManageMentModal from "../../Components/Modal/LicenseManagement/LicenseManageMentModal";
import RenewLicenseModal from "../../Components/Modal/LicenseManagement/RenewLicenseModal";

const LicenseManagement = () => {
  const [modal, setModal] = useState(false);
  const [renewModal, setRenewModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };
  const handleRenewModal = () => {
    setRenewModal(!renewModal);
  };
  return (
    <div>
      <LicenseManageMentModal modal={modal} handleModal={handleModal} />
      <RenewLicenseModal
        renewModal={renewModal}
        handleRenewModal={handleRenewModal}
      />
      <div className="flex items-center gap-5 mt-8">
        <button
          onClick={handleModal}
          className="px-6 py-2 rounded-lg bg-primary text-white font-medium"
        >
          Add New License
        </button>
        <button
          onClick={handleRenewModal}
          className="px-6 py-2 rounded-lg bg-primary text-white font-medium"
        >
          Renew License
        </button>
      </div>
    </div>
  );
};

export default LicenseManagement;
