import { Key, useEffect, useState } from "react";
import TData from "../../Components/Table/TData";
import axiosInstance from "../../utils/axiosConfig";
import PurchasePlaneModal from "../../Components/Modal/PurchasePlaneModal";
import Skeleton from "react-loading-skeleton";
import { formatToLocalDate } from "../../hooks/formatDate";
import { Link } from "react-router-dom";

type IPurchase = {
  created_at: string;
  id: string;
};

type IDate = {
  days: string;
  hours: string;
  id: string;
};

const PurchasePlane = () => {
  const [modal, setModal] = useState(false);
  const [singleData, setSingleData] = useState();

  const [loading, setLoading] = useState(false);
  // console.log(loading)

  const [purchasePlane, setPurchasePlane] = useState<any>([]);
  // console.log(purchasePlane)

  // *********** get purchase plan data
  const getPurchasePlane = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/client/package-purchase-history"
      );
      if (response?.data?.success == 200) {
        setPurchasePlane(response?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPurchasePlane();
  }, []);
  //  --------- purchase plan modal show funciton
  const handleModal = (clientId: any) => {
    setModal(!modal);
    const purchasePlanSingleData = purchasePlane?.find(
      (data: any) => data.id === clientId
    );
    setSingleData(purchasePlanSingleData);
  };

  // const dateCount = () => {
  //   return purchasePlane.map((purchase: IPurchase) => {
  //     console.log(purchase)
  //     const id = purchase.id
  //     const creatDate = new Date(purchase.created_at)
  //     const currentDate = new Date()
  //     const diffInMilliseconds = currentDate.getTime() - creatDate.getTime()
  //     const hours = diffInMilliseconds / (1000 * 60 * 60)
  //     const days = Math.floor(hours / 24)
  //     const hour = Math.floor(hours % 24)
  //     return {
  //       id: id,
  //       days: days,
  //       hours: hour,
  //     }
  //   })
  // }
  // const date = dateCount()
  return (
    <>
      <PurchasePlaneModal
        handleModal={handleModal}
        modal={modal}
        singleData={singleData}
      />
      <div className="md:p-6 px-3 pt-4">
        <div className="flex justify-end">
          <Link to="/dashboard/start-here">
            <button className="px-5 py-2 rounded-lg bg-primary text-white font-semibold">
              Add New Licenses
            </button>
          </Link>
        </div>
        {loading ? (
          <div className="mt-5">
            <Skeleton height={35} count={7} />
          </div>
        ) : (
          <>
            {purchasePlane.length !== 0 ? (
              <div className=" rounded-xl border-2 border-[#E2E2E9] pb-4 mt-4">
                <div className="overflow-x-auto w-full">
                  <table className=" border-collapse w-full">
                    <thead>
                      <tr className="bg-[#FAFAFA] text-secondary">
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Order Id
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap ">
                          Plan
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Price
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Created
                        </th>
                        {/* <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Total Days
                        </th> */}
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Status
                        </th>
                        <th className="py-2 px-6 text-start  whitespace-nowrap">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {purchasePlane?.map((item: any, i: Key) => (
                        <tr
                          key={i}
                          className="border-b border-[#E2E2E9] text-[#616365]"
                        >
                          <TData data={item.client_id} className="  px-6" />
                          <TData data={item.package_name} className="px-6" />
                          <TData className="px-6">${item.package_price}</TData>
                          <TData
                            data={formatToLocalDate(item.created_at)}
                            className="  px-6"
                          />

                          {/* {date.map((d: IDate) => (
                            <>
                              {d.id == item.id && (
                                <TData className="  px-6">
                                  {d.days}day-{d.hours}h
                                </TData>
                              )}
                            </>
                          ))} */}

                          <TData className="px-6">
                            <span className="font-semibold text-[14px] text-green-500 bg-[#DCF3DE] rounded px-5 py-1">
                              {item.status == 0 ? "Valid" : "Expired"}
                            </span>
                          </TData>
                          <TData className="  px-6">
                            <button
                              onClick={() => handleModal(item.id)}
                              className="font-semibold text-[14px] text-white bg-[#000000ae] rounded px-5 py-1"
                            >
                              View
                            </button>
                          </TData>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              "User hasn't any purchase plan"
            )}
          </>
        )}
      </div>
      {/* <Pagination
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        handlePrevPage={handlePrevPage}
      /> */}
    </>
  );
};

export default PurchasePlane;
