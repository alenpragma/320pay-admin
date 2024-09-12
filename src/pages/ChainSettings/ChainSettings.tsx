import TData from "../../Components/Table/TData";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import TableBody from "../../Components/TableBody/TableBody";
import { useState } from "react";
import AddNewChainModal from "../../Components/Modal/ChainModal/AddNewChainModal";

const ChainSettings = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [editChainModal, setEditChainModal] = useState<boolean>(false);
  const handleModal = () => {
    setModal(!modal);
  };
  const handleViewModal = () => {
    setEditChainModal(!editChainModal);
  };
  return (
    <>
      <AddNewChainModal modal={modal} handleModal={handleModal} />
      <div className="py-5 px-3">
        <div className="w-full flex justify-end">
          <button
            onClick={handleModal}
            className="px-4 py-1 bg-primary rounded-lg text-white font-medium"
          >
            Add New Chain
          </button>
        </div>
        <TableBody>
          <table className=" border-collapse w-full">
            <thead>
              <tr className="bg-[#e2e2e965] text-cslate rounded-tl-lg">
                <th className="py-2 px-6 text-start rounded-tl-lg ">
                  Package Name
                </th>
                <th className="py-2 px-6 text-start">Chain Symbol</th>
                <th className="py-2 px-6 text-start">Chain ID</th>
                <th className="py-2 px-6 text-start">Chain RPC Url</th>
                <th className="py-2 px-6 text-start">Chain Logo</th>
                <th className="py-2 px-6 text-start">Status</th>
                <th className="py-2 px-6 text-start">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              <TData className="px-6">BNB Smart Chainn</TData>
              <TData className="px-6">BNB</TData>
              <TData className="px-6">#5443</TData>
              <TData className="px-6">www.bitcoin.web</TData>
              <TData className="px-6">
                <div className="size-8 bg-slate-300 rounded-full"></div>
              </TData>
              <TData className="px-6">
                <div className="bg-green-200 px-3 py-1 rounded-lg w-fit text-green-500">
                  <span>Active</span>
                </div>
              </TData>
              <TData className="px-6">
                <div className="flex items-center gap-3">
                  <FiEdit className="size-5 text-primary cursor-pointer" />{" "}
                  <RiDeleteBin6Line className="size-5 text-red-500 cursor-pointer" />
                </div>
              </TData>
            </tbody>
          </table>
        </TableBody>
      </div>
    </>
  );
};

export default ChainSettings;
