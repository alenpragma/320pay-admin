import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      containerClassName={"pagination flex justify-center mt-6"}
      pageClassName={"mx-1"}
      pageLinkClassName={"px-4 py-2 border rounded hover:bg-gray-200"}
      previousLinkClassName={"px-4 py-2 border rounded hover:bg-gray-200"}
      nextLinkClassName={"px-4 py-2 border rounded hover:bg-gray-200"}
      activeClassName={"bg-blue-500 text-white"}
      disabledClassName={"opacity-50 cursor-not-allowed"}
    />
  );
};

export default Pagination;
