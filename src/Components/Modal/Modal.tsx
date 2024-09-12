import { useState } from "react"
import { copyToClipboard } from "../../utils/Actions"
import { FaCopy } from "react-icons/fa"
import { RxCross1 } from "react-icons/rx"
import QRCode from "react-qr-code"
import { formatToLocalDate } from "../../hooks/formatDate"

type IModal = {
  handleModal: () => void
  modal: boolean
  data: any
}

const Modal = ({ data, handleModal, modal }: IModal) => {
  console.log(data)

  const [textToCopy, setTextToCopy] = useState<string>("")
  const handleCopy = (copy: string) => {
    copyToClipboard(textToCopy)
    setTextToCopy(copy)
  }
  return (
    <div className="w-full ">
      <div
        className={` ${
          modal
            ? " opacity-100   fixed bg-[#07070745] w-full h-screen z-[100] right-0 top-0 bottom-0 m-auto"
            : "opacity-0    -z-50"
        }`}
        onClick={handleModal}
      ></div>
      <div
        className={`fixed bg-[#ffffff] md:w-6/12 w-11/12 h-fit m-auto right-0 left-0 top-0 bottom-20 rounded  ${
          modal ? " opacity-100 z-[101]" : "opacity-0 -z-[102]"
        }`}
      >
        <div className="w-full h-full rounded">
          <div className="w-full py-3 px-5 bg-primary text-white font-semibold text-[20px] flex justify-between items-center rounded-t">
            <h4>Licenses Datils</h4>
            <RxCross1
              onClick={handleModal}
              className="cursor-pointer hover:scale-105"
            />
          </div>
          <div className="px-5 pb-20 pt-8">
            <div className="flex justify-between items-center text-secondary py-3 border-b border-b-[#E2E2E9]">
              <span className="text-[18px] font-semibold">Expiry</span>{" "}
              <span className="text-[16px]">
                {formatToLocalDate(data?.end_date)}
              </span>
            </div>
            <div className="flex justify-between items-center text-secondary py-3 border-b border-b-[#E2E2E9]">
              <span className="text-[18px] font-semibold">Order Id</span>{" "}
              <span className="text-[16px]">{data?.id}</span>
            </div>
            <div className="flex justify-between items-center text-secondary py-3 border-b border-b-[#E2E2E9]">
              <span className="text-[18px] font-semibold">Domain Name</span>{" "}
              <span className="text-[16px]">{data?.domain_name}</span>
            </div>
            <div className="flex justify-between text-secondary py-3 border-b border-b-[#E2E2E9]">
              <span className="text-[18px] font-semibold">
                Scan Licenses QR
              </span>{" "}
              {/* <span className="text-[16px]">
                <img className="size-24" src={images.qrCode} alt="" />
              </span> */}
              <QRCode
                size={256}
                style={{ height: "100px", maxWidth: "100px", width: "100px" }}
                value={`${data?.license_key} ${data?.domain_name} ${data?.email}`}
                viewBox={`0 0 256 256`}
              />
            </div>

            <div className="w-full mt-4">
              <div className=" rounded-lg bg-[#91919131] flex  items-center text-end">
                <span className=" w-full text-[14px]  text-start pl-3 font-semibold">
                  {data?.license_key}
                </span>
                <span
                  onClick={() => handleCopy(data?.license_key)}
                  className="px-8 py-3 text-white bg-primary rounded-r-lg cursor-pointer"
                >
                  <FaCopy />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
