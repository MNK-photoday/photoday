import { Content } from '../../../styles/Layout';
import styled, { css } from 'styled-components';

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

export const S_UserDescription = styled.p`
  /* 추후에 수정 */
  max-width: 80%;
  margin: 3% 0 115px;
  font-size: var(--font-size-m);
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

export const S_TextButton = styled.button<{ isTextButtonType: TextButtonType }>`
  font-size: var(--font-size-sm);
  display: flex;
  text-decoration: underline;
  ${({ isTextButtonType }) => TextButtonCss[isTextButtonType]}
`;

export const S_DeleteAccountText = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-primary-black);
`;
