import styled from 'styled-components';
import { Container, Content } from '../../styles/Layout';
import { Flex, RowFlex, ColFlex } from '../../styles/GlobalStyles';

export const S_UserPageContainer = styled(Container)`
  background-color: red;
`;

export const S_UserSection = styled.section`
  ${RowFlex}
  margin-top: 55px;
  background-color: green;
  height: 50%;
`;

export const S_UserThumnailArea = styled.div`
  ${ColFlex}
  align-items: center;
  width: 20%;
  background-color: pink;
`;

export const S_UserInfoArea = styled(Content)`
  width: 80%;
  background-color: gold;
`;

export const S_UserPageTitle = styled.div`
  background-color: skyblue;
  display: flex;
  align-items: center;
  height: 10%;
`;

export const S_UserPhotoContentBox = styled.article`
  background-color: skyblue;
  display: flex;
  justify-content: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 30px 20%;
  place-items: center;
  gap: 20px;
`;

export const S_UserPhotoContent = styled.img`
  background-color: yellow;
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const S_Pagination = styled.div`
  ${Flex}
  padding-bottom: 55px;
`;
