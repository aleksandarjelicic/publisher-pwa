import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

const Pagination = ({ currentPage, totalPages, listTopRef = null }) => {
  const router = useRouter();
  const paginationHandler = (page) => {
    const as = page.selected
      ? "/" + router.query.slug.join("/") + "?page=" + (page.selected + 1)
      : "/" + router.query.slug.join("/");

    router.push(router.pathname + "?page=" + (page.selected + 1), as);
    if (listTopRef) listTopRef.current.scrollIntoView();
  };

  return (
    <div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        activeClassName={"active"}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        initialPage={currentPage - 1}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={paginationHandler}
        disableInitialCallback={true}
      />
    </div>
  );
};

export default Pagination;
