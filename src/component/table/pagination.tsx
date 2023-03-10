import { useCallback } from "react";
import { usePagination } from "../../hooks/usePagination";
import { DOTS } from "../../constants/constant";
import classnames from "classnames";
import "./pagination.scss";
import styled from "styled-components";
import shortid from "shortid";

interface IPaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
}

const Li = ({
  pageNumber,
  onPageChange,
  selected,
}: {
  pageNumber: number;
  onPageChange: (page: number) => void;
  selected: boolean;
}) => {
  const onPage = useCallback(() => {
    onPageChange(pageNumber);
  }, [onPageChange, pageNumber]);

  return (
    <li
      className={classnames("pagination-item", {
        selected: selected,
      })}
      onClick={onPage}
    >
      {pageNumber}
    </li>
  );
};
const Pagination = (props: IPaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    totalCount,
    siblingCount,
    pageSize,
    currentPage,
  });

  const lastPage = paginationRange?.[paginationRange.length - 1];

  const onNext = useCallback(() => {
    onPageChange(currentPage + 1);
  }, [currentPage, onPageChange]);

  const onPrevious = useCallback(() => {
    onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  if (currentPage === 0 || (totalCount ?? 0) < 2) {
    return null;
  }

  return (
    <CustomUl className={classnames("pagination-container")}>
      <CustomLi
        onClick={onPrevious}
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
      >
        <div className="arrow left" />
      </CustomLi>
      {paginationRange?.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <CustomLi key={shortid.generate()} className="pagination-item dots">
              &#8230;
            </CustomLi>
          );
        }

        return (
          <Li
            key={shortid.generate()}
            selected={pageNumber === currentPage}
            onPageChange={onPageChange}
            pageNumber={pageNumber as number}
          />
        );
      })}
      <CustomLi
        className={classnames("pagination-item", {
          disabled:
            currentPage === lastPage || (paginationRange?.length ?? 0) > 1,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </CustomLi>
    </CustomUl>
  );
};

export default Pagination;

//styled

const CustomLi = styled.li``;
const CustomUl = styled.ul``;
