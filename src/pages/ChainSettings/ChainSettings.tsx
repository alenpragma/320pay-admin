import TData from "../../Components/Table/TData";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import TableBody from "../../Components/TableBody/TableBody";
import {useState } from "react";
import AddNewChainModal from "../../Components/Modal/ChainModal/AddNewChainModal";
import axiosInstance from "../../utils/axiosConfig";
import ChainEditModal from "../../Components/Modal/ChainModal/ChainEditModal";
import { handleDeleteFn } from "../../utils/DeleteAction/HandleDeleteFn";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";

const fetchChain = async () => {
  const response = await axiosInstance.get("/rpc-urls");
  return response?.data[0];
};

const ChainSettings = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [editChain, setEditChain] = useState<string>("");
  const [chainModal, setChainModal] = useState<boolean>(false);
  const handleModal = () => {
    setModal(!modal);
  };
  const handleEditModal = (chainData: string) => {
    setChainModal(!chainModal);
    setEditChain(chainData);
  };

  const {
    data: chain,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["chain"],
    queryFn: fetchChain,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const handleDelete = (deleteId: string) => {
    const url = `/rpc-url/delete/${deleteId}`;
    handleDeleteFn(url, refetch);
  };
  return (
    <>
      <AddNewChainModal
        modal={modal}
        handleModal={handleModal}
        refetch={refetch}
      />
      <ChainEditModal
        handleModal={handleEditModal}
        modal={chainModal}
        refetch={refetch}
        editChain={editChain}
      />
      {isLoading ? (
        <div className="mt-5">
          <Skeleton height={50} count={7} />
        </div>
      ) : (
        <>
          {chain?.length !== 0 ? (
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
                      <th className="py-2 px-6 text-start text-nowrap">
                        Chain Symbol
                      </th>
                      <th className="py-2 px-6 text-start  text-nowrap">
                        Chain ID
                      </th>
                      <th className="py-2 px-6 text-start  text-nowrap">
                        Chain Logo
                      </th>
                      <th className="py-2 px-6 text-start  text-nowrap">
                        Status
                      </th>
                      <th className="py-2 px-6 text-start  text-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {chain?.map((item: any) => (
                      <tr key={item.id}>
                        <TData className="px-6">{item?.rpc_chain}</TData>
                        <TData className="px-6">{item?.chain_symbol}</TData>
                        <TData className="px-6">{item?.chain_id}</TData>
                        <TData className="px-6">
                          <div className="size-8  rounded-full">
                            <img src={item?.image} alt="" />
                          </div>
                        </TData>
                        <TData className="px-6">
                          {item?.status !== "1" ? (
                            <div className="bg-red-200 w-[100px] text-center px-3 py-1 rounded-lg  text-red-500">
                              <span>Deactive</span>
                            </div>
                          ) : (
                            <div className="bg-green-200 text-center w-[100px] px-3 py-1 rounded-lg  text-green-500">
                              <span>Active</span>
                            </div>
                          )}
                        </TData>
                        <TData className="px-6">
                          <div className="flex items-center gap-3">
                            <FiEdit
                              onClick={() => handleEditModal(item)}
                              className="size-5 text-primary cursor-pointer"
                            />{" "}
                            <RiDeleteBin6Line
                              onClick={() => handleDelete(item?.id)}
                              className="size-5 text-red-500 cursor-pointer"
                            />
                          </div>
                        </TData>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableBody>
            </div>
          ) : (
            <p className="mt-5">No Data</p>
          )}
        </>
      )}
    </>
  );
};

export default ChainSettings;
