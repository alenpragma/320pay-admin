const bgColors = ["bg-[#FFFAF1]", "bg-[#EFF6FF]"];
const BalanceSwiperCard = ({ wallet, keys }: any) => {
  const bgColor = bgColors[keys % 2]; // Cycle through the background colors

  return (
    <>
      <div
        className={`${bgColor} border-2 min-w-full  flex p-3 rounded-md justify-between items-center   border-slate-300 gap-2`}
      >
        <div className="w-1/5">
          <img className="size-10" src={wallet.image} alt="" />
        </div>
        <div className="flex justify-between items-center w-4/5">
          <div className="">
            <div className="flex items-center gap-1">
              <h5>{wallet?.token_symbol}</h5>
              <span className="bg-yellow-500 text-white text-[8px] px-3 py-[2px] rounded-md h-fit">
                {wallet?.chain_symbol}
              </span>
            </div>
            <p className="text-[12px] text-secondary">{wallet?.token_name}</p>
          </div>
          <div>
            <h4 className="text-[14px]">${wallet.balance}</h4>
            <h4 className="text-[14px] text-secondary">$0.00</h4>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-red-500">
        {wallet?.warning ? <>Warning:- {wallet.warning}</> : ""}
      </p>
    </>
  );
};

export default BalanceSwiperCard;
