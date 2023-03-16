import styled from 'styled-components';
import { Container } from '../../styles/Layout';
import { Flex, RowFlex } from '../../styles/GlobalStyles';

export const S_UserPageContainer = styled(Container)`
  flex-direction: column;
  margin: 0 170px;
`;

export const S_UserSection = styled.section`
  ${RowFlex}
  margin-top: 55px;
`;

export const S_UserPhotoContentBox = styled.article`
  display: flex;
  justify-content: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 30px 8%;
  place-items: center;
  gap: 20px;
`;

export const S_UserPhotoContent = styled.img`
  width: 100%;
  height: 210px;
  object-fit: cover;
`;

// 페이지네이션 컴포넌트 생성 후 삭제
export const S_Pagination = styled.div`
  ${Flex}
  padding-bottom: 55px;
`;
