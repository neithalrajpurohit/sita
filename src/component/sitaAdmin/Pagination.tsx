import classnames from "classnames";
import { usePagination } from "../../hooks/usePagination";
import { useTranslation } from "react-i18next";

const Pagination = (props: any) => {
  const { t } = useTranslation();
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    firstPageIndex,
    lastPageIndex,
  } = props;

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      <li className="pagination-row-per-page">
        <p>{t("rowsperpage")}: &nbsp;</p>
        <p className="pagination-page-size">{pageSize}</p>
      </li>
      <li className={classnames("pagination-item font-size-1-rem", {})}>
        {firstPageIndex + 1} -
        {currentPage === paginationRange.length ? totalCount : lastPageIndex} of{" "}
        {totalCount}
      </li>
      <li
        className={classnames("pagination-item pagination-page-btn-arrows", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
        aria-hidden="true"
      >
        {" "}
        {"<"}
      </li>
      <li
        className={classnames("pagination-item pagination-page-btn-arrows", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
        aria-hidden="true"
      >
        {" "}
        {">"}
      </li>
    </ul>
  );
};

export default Pagination;
