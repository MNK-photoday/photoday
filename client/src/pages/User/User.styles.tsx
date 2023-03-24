import styled from 'styled-components';
import { Container } from '../../styles/Layout';
import { Flex, RowFlex } from '../../styles/GlobalStyles';

export const S_UserPageContainer = styled(Container)`
  flex-direction: column;
  margin: 0 170px 50px 170px;
`;

export const S_UserSection = styled.section`
  ${RowFlex}
  margin-top: 55px;
`;
