import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

const Pagination = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const paginationHandler = (page) => {
    let slug = router.query.slug;
    const pageInSlugIndex = slug.indexOf("page");
    if (pageInSlugIndex >= 0) {
      slug = slug.slice(0, pageInSlugIndex);
    }

    const as = page.selected
      ? "/" + slug.join("/") + "/page/" + (page.selected + 1)
      : "/" + slug.join("/");
    const path = page.selected
      ? router.pathname + "/page/" + (page.selected + 1)
      : router.pathname;

    router.push(path, as);
  };

  if (totalPages < 2) return null;

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
