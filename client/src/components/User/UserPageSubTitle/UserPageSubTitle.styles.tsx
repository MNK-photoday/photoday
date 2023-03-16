import styled from 'styled-components';

export const S_UserPageSubTitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 8% 8% 2% 8%;
  height: 5%;
  color: var(--color-primary-black);
`;

export const S_UserPageSubTitlePoint = styled.span`
  color: var(--color-primary-green);
`;

export const S_BookmarkButton = styled.button`
  border-radius: 50%;
  width: 25px;
  height: 25px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 6px rgba(0, 0, 0, 0.23);
  margin-left: 30px;

  .bookmarkIcon {
    color: var(--color-primary-green);
    font-weight: bold;
  }
`;
