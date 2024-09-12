type TPaginationProps = {
  handlePrevPage: () => void;
  currentPage: number;
  handleNextPage: () => void;
  totalPages: number;
};

const Pagination = ({
  handlePrevPage,
  currentPage,
  handleNextPage,
  totalPages,
}: TPaginationProps) => {
  return (
    <div className="flex justify-end p-4">
      <button
        onClick={handlePrevPage}
        className="mr-2 px-4 py-2 border rounded disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={handleNextPage}
        className="px-4 py-2 border rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
