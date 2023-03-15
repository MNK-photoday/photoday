import styled from 'styled-components';
import { Content } from '../../styles/Layout';
import { Flex, RowFlex, ColFlex } from '../../styles/GlobalStyles';
import Button from '../../components/common/Button/Button';

export const S_UserSection = styled.section`
  ${RowFlex}
  margin-top: 55px;
`;

export const S_UserThumnailArea = styled.div`
  ${ColFlex}
  align-items: center;
  width: 20%;
  border-right: 1px solid rgba(194, 194, 194, 0.5);
  margin-right: 5%;
`;

export const S_UserProfileIamge = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
`;

export const S_UserFollowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const S_UserFollowCount = styled.span`
  ${Flex}
  font-size: var(--font-size-m);
  margin: 8px 10px;
`;

export const S_UserFollow = styled.span`
  font-size: var(--font-size-sm);
  margin: 0 10px;
`;

export const S_Button = styled(Button)`
  background-color: red;
`;

export const S_UserInfoArea = styled(Content)`
  width: 80%;
`;

export const S_UserPageTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 5% 0 2% 5%;
  height: 5%;
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
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const S_Pagination = styled.div`
  ${Flex}
  padding-bottom: 55px;
`;
