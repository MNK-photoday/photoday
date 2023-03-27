import styled from 'styled-components';
import { RowFlex, ColFlex, Flex } from '../../styles/GlobalStyles';

export const S_DetailBox = styled.div`
  ${ColFlex}
  align-items: center;
  justify-content: flex-start;

  padding-top: 40px;

  height: auto;
`;

export const S_PicBox = styled.div`
  ${ColFlex}
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: auto;
  margin-bottom: 20px;

  padding: 20px 40px;
  border-radius: 10px;

  &:hover {
    > :first-child {
      transition: all 0.3s ease-in-out;
      opacity: 1;
    }
    > :last-child {
      transition: all 0.3s ease-in-out;
      opacity: 1;
    }
  }
`;

export const S_ContentsTop = styled.div`
  ${RowFlex}
  width: 100%;
  justify-content: space-between;
  opacity: 0;
  z-index: 3;
  transition: all 0.3s ease-in-out;
`;

export const S_UserBox = styled.div`
  display: flex;

  > .user-profile {
    > img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }

  > .user-name {
    ${Flex}
    margin-right: 15px;
    font-size: 16px;
    font-weight: bold;

    &:hover {
      cursor: pointer;
    }
  }

  > .user-follow {
    ${Flex}
    color: var(--color-primary-green);

    &:hover {
      cursor: pointer;
    }
  }
`;

export const S_IconBox = styled.div<{ isModal: boolean }>`
  width: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .like-icon {
    color: var(--color-primary-gray30);
    &:hover {
      cursor: pointer;
      color: var(--color-primary-red);
    }
  }
  .clicked-like-icon {
    color: var(--color-primary-red);
    &:hover {
      cursor: pointer;
      color: var(--color-primary-gray30);
    }
  }
  .bookmark-icon {
    color: var(--color-primary-gray30);
    &:hover {
      cursor: pointer;
      color: var(--color-primary-green);
    }
  }
  .clicked-bookmark-icon {
    color: var(--color-primary-green);
    &:hover {
      cursor: pointer;
      color: var(--color-primary-gray30);
    }
  }
  .dots-icon {
    color: ${({ isModal }) =>
      isModal ? 'var(--color-primary-black)' : 'var(--color-primary-gray30)'};
    &:hover {
      cursor: pointer;
    }
  }
`;
export const S_Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 85%;
  height: auto;

  > img {
    width: 100%;
    height: auto;
  }
`;

export const S_ContentsBottom = styled.div`
  ${RowFlex}
  width: 100%;
  justify-content: space-between;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  > Button {
    height: 30px;
    margin-top: 10px;
  }
`;

export const S_CountBox = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  > div {
    margin-right: 10px;
    text-align: start;
    display: flex;
    align-items: center;
    > .view-icon {
      display: block;
      margin-right: 5px;
    }
    > .like-icon {
      margin-right: 5px;
      color: var(--color-primary-red);
    }
  }
`;

export const S_UploadDateBox = styled.div`
  margin-top: 10px;
  font-size: var(--font-size-sm);
  font-weight: 100;
  color: var(--color-primary-gray20);
`;

export const S_SeachList = styled.div`
  width: 85%;
  height: 1000px;
`;
