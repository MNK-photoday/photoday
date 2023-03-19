import styled, { css } from 'styled-components';
import { Content } from '../../../styles/Layout';

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
    color: var(--color-primary-black);
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

export const S_UserDescription = styled.p<{ isEdit: boolean }>`
  /* 추후에 수정 */
  max-width: 80%;
  font-size: var(--font-size-m);
  margin: ${({ isEdit }) => (isEdit ? '3% 0 10px' : '3% 0 125px')};
`;

export const S_TextButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

type TextButtonType = 'edit' | 'changePassword' | 'deleteAccount' | 'Cancel';

const TextButtonCss = {
  edit: css`
    color: var(--color-primary-black);
    margin-bottom: 20px;

    &:hover {
      color: #919191;
    }
  `,
  changePassword: css`
    color: var(--color-primary-red);
  `,

  deleteAccount: css`
    margin-top: 20px;
    color: var(--color-primary-red);
  `,

  Cancel: css`
    color: var(--color-primary-black);
    position: relative;
    top: 17.5px;
    left: 100px;
  `,
};

export const S_TextButton = styled.button<{ isTextButtonType: TextButtonType }>`
  font-size: var(--font-size-sm);
  display: flex;
  text-decoration: underline;
  width: 110px;
  ${({ isTextButtonType }) => TextButtonCss[isTextButtonType]}

  &:hover {
    filter: brightness(0.9);
  }
`;

export const S_DeleteAccountText = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-primary-black);
`;

export const S_InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0;

  label {
    color: var(--color-primary-black);
    font-size: var(--font-size-sm);
  }

  input {
    margin-bottom: 10px;
  }

  p {
    bottom: 0px;
  }
`;
