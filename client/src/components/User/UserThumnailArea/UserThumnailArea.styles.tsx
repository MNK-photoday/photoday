import { Flex, ColFlex } from '../../../styles/GlobalStyles';
import styled from 'styled-components';

export const S_UserThumnailArea = styled.div`
  ${ColFlex}
  align-items: center;
  width: 25%;
  min-width: 300px;
  border-right: 1px solid rgba(194, 194, 194, 0.5);
  margin-right: 5%;
`;

export const S_UserProfileIamge = styled.img`
  width: 130px;
  height: 130px;
  margin-bottom: 10px;
  border-radius: 50%;
`;

export const S_UserFollowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const S_UserFollowWrap = styled.div`
  cursor: pointer;
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
