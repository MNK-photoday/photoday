import styled, { css } from 'styled-components';
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
  margin-bottom: 10px;
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

export const S_UserInfoArea = styled(Content)`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const S_UserNameContainer = styled.div`
  display: flex;
  align-items: center;

  .likeicon {
    margin-right: 15px;
    color: var(--color-primary-red);
  }

  .reporticon {
    color: #f5f261;
    margin-right: 15px;
  }
`;

export const S_UserName = styled.span`
  font-size: var(--font-size-xxl);
  margin-right: 50px;
`;

export const S_UserLikeAndReport = styled.span`
  margin-right: 20px;
  font-size: var(--font-size-sm);
`;

export const S_UserPageTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 5% 0 2% 5%;
  height: 5%;
`;

export const S_UserPhotoContentBox = styled.article`
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

// 페이지네이션 컴포넌트 생성 후 삭제
export const S_Pagination = styled.div`
  ${Flex}
  padding-bottom: 55px;
`;

export const S_TextButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

type TextButtonType = 'modify' | 'changePassword' | 'deleteAccount';

const TextButtonCss = {
  modify: css`
    color: var(--color-primary-black);
  `,
  changePassword: css`
    color: var(--color-primary-red);
    margin: 20px 0;
  `,

  deleteAccount: css`
    color: var(--color-primary-red);
  `,
};

export const S_UserDescription = styled.p`
  /* 추후에 수정 */
  max-width: 80%;
  margin: 3% 0 115px;
  font-size: var(--font-size-m);
`;

export const S_TextButton = styled.button<{ isTextButtonType: TextButtonType }>`
  font-size: var(--font-size-sm);
  display: flex;
  text-decoration: underline;
  cursor: pointer;
  ${({ isTextButtonType }) => TextButtonCss[isTextButtonType]}
`;

export const S_DeleteAccountText = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-primary-black);
`;
