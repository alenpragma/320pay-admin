type IProps = {
  total: number;
  fetchData: (e: any) => void;
  pages: any;
  setCurrentPage: (e: number) => void;
  currentPage: number;
  totalPages: number;
};
const Pagination = ({
  fetchData,
  pages,
  setCurrentPage,
  currentPage,
  totalPages,
}: IProps) => {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  console.log(setCurrentPage);

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        className={`p-2 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pages.map((page: any, index: number) => {
        const totalPages = pages.length;
        if (
          page <= 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1)
        ) {
          return (
            <button
              key={index}
              className={`p-2 w-10 h-10 ${
                currentPage === page ? "bg-black text-white" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        } else if (page < 3 || page > 3) {
          return (
            <span key={index} className="p-2 w-10 h-10">
              ......
            </span>
          );
        }
        return null;
      })}
      <button
        className={`p-2 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
