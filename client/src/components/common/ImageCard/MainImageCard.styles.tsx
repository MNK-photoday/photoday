import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const S_MainImageContentBox = styled.section`
  width: 700px;
  height: 100%;

  @media screen and (max-width: 1500px) {
    padding-left: 30px;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    padding-left: 0px;
    height: 100%;
  }
`;

export const S_MainImageContentWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const S_MainImgBox = styled(Link)`
  position: relative;
  width: 100%;
  height: 430px;
  display: flex;
  overflow: hidden;
`;

export const S_MainImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  object-fit: cover;
`;
