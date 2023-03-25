import styled from 'styled-components';
import { Flex, ColFlex } from '../../../styles/GlobalStyles';

export const S_UserPageSubTitleWrap = styled.div<{ currentTap: string }>`
  display: flex;
  align-items: center;
  margin: 15% 8% 0% 8%;
  height: 5%;
  color: var(--color-primary-black);
  border-bottom: 1px solid #d9d9d96a;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;

  .user {
    border-bottom: ${({ currentTap }) =>
      currentTap === 'user' ? '3px solid #3cb46e' : 'none'};
  }

  .bookmark {
    ${({ currentTap }) =>
      currentTap === 'bookmark' &&
      `
    border-bottom: 3px solid #3cb46e;
    color: var(--color-primary-green);
  `}
  }
`;

export const S_UserPageSubTitlePoint = styled.span`
  color: var(--color-primary-green);
`;

export const S_Tab = styled.div`
  height: 40px;
  margin-right: 50px;
`;

export const S_UserPhotoContentContainer = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 30px 8%;
  place-items: center;
  gap: 20px;
`;

export const S_NoPostsGuideContainer = styled.div`
  ${ColFlex}
  align-items: center;
  margin: 10% 0;
`;

export const S_NoPostsGuideIcon = styled.i`
  color: var(--color-primary-green);
`;

export const S_NoPostsGuide = styled.span`
  color: var(--color-primary-black);
  font-size: var(--font-size-l);
  margin: 15px 0;
`;
