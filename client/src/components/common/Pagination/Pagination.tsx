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
  setPaginate: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({ pagination, setPaginate }: Pagination) {
  const { pageNumber, totalPages } = pagination;
  const pageNumbers = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <S_PaginationContainer>
      <S_PageButton>
        <RxDoubleArrowLeft size={11} onClick={() => setPaginate(1)} />
      </S_PageButton>
      <S_PageButton>
        <IoIosArrowBack size={11} onClick={() => setPaginate(pageNumber - 1)} />
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
      <S_PageButton>
        <IoIosArrowForward
          size={11}
          onClick={() => setPaginate(pageNumber + 1)}
        />
      </S_PageButton>
      <S_PageButton>
        <RxDoubleArrowRight size={11} onClick={() => setPaginate(totalPages)} />
      </S_PageButton>
    </S_PaginationContainer>
  );
}

export default Pagination;
