import styled from 'styled-components';
import { RowFlex } from './GlobalStyles';

/*최상위 컨테이너 */
export const ContainerWrap = styled.main`
  ${RowFlex}
  justify-content: center;

  @media screen and (max-width: 650px) {
    margin: 0 30px;
  }
`;

/* 컨텐츠 컨테이너 */
export const Container = styled.div`
  max-width: 1830px;
  width: 100%;
  height: 100%;
  ${RowFlex}
`;

/* 컨텐츠 컨테이너 + flex */
export const ContainerFlex = styled(Container)`
  display: flex;
`;

/*컨텐츠 빈공간 채우게 */
export const Content = styled.div`
  display: flex;
  flex-grow: 1;
`;

/*모바일 좌우상하 공간*/
export const MobileContainerWrap = styled(Content)`
  padding: 30px 40px;
`;

/*타블렛 좌우상하 공간*/
export const TabletContainerWrap = styled(Content)`
  padding: 40px 80px;
`;

/*앱 좌우상하 공간*/
export const DesktopContainerWrap = styled(Content)`
  padding: 60 95px;
`;
