import styled from 'styled-components';
import { Container } from '../../styles/Layout';
import { Flex, RowFlex, ColFlex } from '../../styles/GlobalStyles';

export const S_UserPageContainer = styled(Container)`
  ${ColFlex}
  margin: 55px 170px 60px 170px;
  width: 100%;
`;

export const S_UserSection = styled.section`
  ${RowFlex}
  width: 100%;

  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;
