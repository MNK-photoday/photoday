import styled from 'styled-components';

export const S_UserPageSubTitleWrap = styled.div<{ currentTap: string }>`
  display: flex;
  align-items: center;
  margin: 10% 8% 2% 8%;
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
