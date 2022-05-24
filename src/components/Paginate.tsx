import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactPaginate from "react-paginate";
interface IPaginateProps {
  count: number;
  tableRef: any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
const Paginate = ({ count, setPage, tableRef }: IPaginateProps) => {
  return (
    <ReactPaginate
      forcePage={0}
      pageCount={Math.ceil(count / 10)}
      onPageChange={(e) => {
        setPage(e.selected + 1);
        tableRef.current.scrollIntoView();
      }}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      breakClassName="flex items-center justify-center"
      pageClassName="flex items-center justify-center"
      breakLinkClassName="  px-4 py-2   text-sm font-medium text-yellow-400"
      activeLinkClassName="z-10 bg-[#ffffff29]"
      pageLinkClassName="text-yellow-400 relative inline-flex items-center justify-center h-8 px-[6px] mx-2 w-8 text-center hover:bg-[#ffffff14] rounded-full text-sm transition-all"
      containerClassName="relative w-full items-center justify-center inline-flex rounded-md shadow-sm -space-x-px p-5"
      previousClassName="relative inline-flex items-center px-2 py-2 rounded-l-md   text-sm font-medium text-gray-500 "
      nextClassName="relative inline-flex items-center px-2 py-2 rounded-r-md   text-sm font-medium text-yellow-400"
      nextLinkClassName="flex items-center justify-center"
      previousLinkClassName="relative inline-flex items-center px-2 py-2 rounded-r-md   text-sm font-medium text-yellow-400"
      nextLabel={<FontAwesomeIcon icon="chevron-right" />}
      previousLabel={<FontAwesomeIcon icon="chevron-left" />}
    />
  );
};

export default Paginate;
