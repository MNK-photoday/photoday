import styled from 'styled-components';
import { RowFlex } from '../../../styles/GlobalStyles';
import { Link } from 'react-router-dom';

export const LinkToTextContainer = styled.div`
  ${RowFlex}
`;

export const LinkToText = styled.p`
  font-size: var(--font-size-sm);
`;

export const LinkTo = styled(Link)`
  color: var(--color-primary-green);
  font-weight: bold;
  margin-left: 10px;

  &:hover {
    color: hsl(140, 40%, 44%);
  }
`;
