import { FaCopy } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";

type IHoverItemProps = {
  handleCopy: (text: string) => void;
  item: any;
  history: any;
};

const HoverTableItem = ({ value }: any) => {
  return (
    <>
      <div className={` text-white absolute -top-11   w-fit z-[3]`}>
        <div className="relative w-full">
          <div className="absolute  rotate-45 -bottom-[8px] left-5 size-5 bg-black -z-[4]"></div>
          <p className={`bg-black z-[5] px-3 py-1 rounded`}>
            {value}
          </p>
        </div>
      </div>
    </>
  );
};

export default HoverTableItem;
