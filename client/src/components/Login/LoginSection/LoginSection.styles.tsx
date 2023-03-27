import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { RowFlex } from '../../../styles/GlobalStyles';

export const S_FormContainer = styled.form`
  height: 100vh;
`;

export type ShowMessageType = 'show' | 'hide';

const InvalidMessageCSS = {
  show: css`
    position: relative;
    bottom: 10px;
    left: 2px;
    color: var(--color-primary-red);
    font-size: var(--font-size-sm);
  `,
  hide: css`
    display: none;
  `,
};

export const S_InvalidMessage = styled.p<{ isShowMessage: ShowMessageType }>`
  ${({ isShowMessage }) => InvalidMessageCSS[isShowMessage]}
  max-width: 375px;
`;

type LinkProps = {
  isaccount: string;
};

export const S_LinkToWrap = styled.div`
  display: flex;
  justify-content: end;
`;

export const S_LinkTo = styled(Link)<LinkProps>`
  color: var(--color-primary-green);
  margin-left: 10px;
  font-weight: bold;

  ${({ isaccount }) =>
    isaccount === 'true' &&
    `
    font-size: var(--font-size-sm);
    font-weight: normal;
    position: relative;
    bottom: 10px;
    width: 120px;
    left: 15px;
    `};
  &:hover {
    color: hsl(140, 40%, 44%);
  }
`;

export const S_CheckBoxContainer = styled.div`
  display: flex;
  margin: 10px 0 20px;
`;

export const S_ButtounContainer = styled.div`
  margin-bottom: 20px;
`;

export const S_LinkToTextContainer = styled.div`
  ${RowFlex}
  font-size: var(--font-size-sm);
`;
