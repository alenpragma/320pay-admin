import { Key, useEffect, useState } from "react"
import { tableData } from "../.."
import TData from "../../Components/Table/TData"
import Modal from "../../Components/Modal/Modal"
import Pagination from "../../Components/Pagination/Pagination"
import axiosInstance from "../../utils/axiosConfig"
import { formatToLocalDate } from "../../hooks/formatDate"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

const Licenses = () => {
  const [modal, setModal] = useState<boolean>(false)
  // const [renewModal, setRenewModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(tableData?.length / itemsPerPage)

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleModal = () => {
    setModal(!modal)
  }
  const handelDetailsModal = (data: any) => {
    setData(data)
  }

  const [licenses, setLicenses] = useState<any>([])

  const getLicenses = async () => {
    setLoading(true)
    const response = await axiosInstance.get("/client/license-purchase-history")
    if (response?.data?.success == 200) {
      setLicenses(response?.data?.data)
    }
    setLoading(false)
  }
  useEffect(() => {
    getLicenses()
  }, [])

  return (
    <>
      <Modal data={data} handleModal={handleModal} modal={modal} />
      {/* <Renew handleRenewModal={handleRenewModal} renewModal={renewModal} /> */}
      <div className="md:p-6 px-3 pt-4">
        <div className="flex justify-end">
          <Link to={"/dashboard/start-here"}>
            <button className="px-5 py-2 rounded-lg bg-primary text-white font-semibold">
              Add New Licenses
            </button>
          </Link>
        </div>
        <div className=" rounded-xl border-2 border-[#E2E2E9] pb-4 mt-4">
          <div className="overflow-x-auto w-full">
            {loading == true ? (
              <div>
                <Skeleton height={35} count={3} />
              </div>
            ) : (
              <table className=" border-collapse md:w-full w-fit">
                <thead>
                  <tr className="bg-[#FAFAFA] text-secondary">
                    <th className="py-2 px-6 text-start  rounded-l-xl">SL</th>
                    <th className="py-2 px-6 text-start">Server</th>
                    <th className="py-2 px-6 text-start">Start</th>
                    <th className="py-2 px-6 text-start">Expiry</th>
                    <th className="py-2 px-6 text-start">license key</th>
                    <th className="py-2 px-6 text-start">Status</th>
                    <th className="py-2 px-6 w-[30px] text-start  rounded-r-xl">
                      More
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {licenses?.map((data: any, i: Key) => (
                    <tr key={i} className="border-b border-[#E2E2E9]">
                      {/* <TData
                      children={` ${i <= 8 ? "0" : ""}${i + 1}`}
                      className="w-2/12 px-6"
                    /> */}{" "}
                      <TData children={Number(i) + 1} className="w-2/12 px-6" />
                      <TData data={data.domain_name} className="w-2/12  px-6" />
                      <TData
                        data={formatToLocalDate(data?.start_date)}
                        className="w-2/12 px-6"
                      />
                      <TData
                        data={formatToLocalDate(data.end_date)}
                        className="w-2/12 px-6"
                      />
                      <TData data={data.license_key} className="w-2/12 px-6" />
                      <TData className=" w-full px-6">
                        <div className=" w-full">
                          {data.status == 0 ? (
                            <button className="font-semibold cursor-text text-[14px] w-[60px] text-green-500 bg-[#DCF3DE] rounded py-1   md:px-0 px-3">
                              Active
                            </button>
                          ) : (
                            <button className="font-semibold text-[14px] w-[60px] text-[#FF9F43] bg-[#FFECD9] rounded py-1    md:px-0 px-3">
                              Expired
                            </button>
                          )}
                        </div>
                      </TData>
                      <TData className="w-full px-7">
                        <div className="w-full">
                          {data.status == 0 ? (
                            <button
                              onClick={() => {
                                handleModal()
                                handelDetailsModal(data)
                              }}
                              className="font-semibold text-[14px] w-[60px] text-white bg-[#000000ae] rounded  py-1  md:px-0 px-4"
                            >
                              Details
                            </button>
                          ) : (
                            <Link to={"/start-here"}>
                              <button
                                className={`font-semibold text-[14px] w-[60px] text-white bg-primary rounded   py-1   md:px-0 px-3 ${
                                  data.status == 0
                                    ? "cursor-not-allowed opacity-80"
                                    : ""
                                }`}
                              >
                                Renew
                              </button>
                            </Link>
                          )}
                        </div>
                      </TData>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        handlePrevPage={handlePrevPage}
      />
    </>
  )
}

export default Licenses
