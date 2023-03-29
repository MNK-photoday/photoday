import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';
import {
  S_PaginationContainer,
  S_PageButton,
  S_ButtonNav,
} from './Pagination.styles';
import { PageInfo } from '../../../api/User';

type Pagination = {
  pagination: PageInfo;
  paginate: number;
  setPaginate: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({ pagination, paginate, setPaginate }: Pagination) {
  const { pageNumber, totalPages } = pagination;
  const pageNumbers = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <S_PaginationContainer>
      <S_PageButton onClick={() => setPaginate(1)}>
        <RxDoubleArrowLeft size={11} />
      </S_PageButton>
      <S_PageButton
        onClick={() =>
          paginate === 1 ? setPaginate(1) : setPaginate(pageNumber - 1)
        }
      >
        <IoIosArrowBack size={11} />
      </S_PageButton>
      {pageNumbers.map((num: number) => (
        <S_ButtonNav
          key={num}
          isCurrentPage={num === pageNumber}
          onClick={() => setPaginate(num)}
        >
          {num}
        </S_ButtonNav>
      ))}
      <S_PageButton
        onClick={() =>
          paginate === totalPages
            ? setPaginate(totalPages)
            : setPaginate(pageNumber + 1)
        }
      >
        <IoIosArrowForward size={11} />
      </S_PageButton>
      <S_PageButton onClick={() => setPaginate(totalPages)}>
        <RxDoubleArrowRight size={11} />
      </S_PageButton>
    </S_PaginationContainer>
  );
}

export default Pagination;
