import styled from 'styled-components';

export const S_MainImageContentBox = styled.section`
  width: 45%;
  @media screen and (max-width: 1500px) {
    padding-left: 30px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding-left: 0px;
    padding-bottom: 50px;
  }
`;

export const S_MainImageCardBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 390px;
  padding: 0 30px;

  &:first-of-type {
    margin-bottom: 30px;
  }

  @media screen and (max-width: 1400px) {
    padding: 0 30px;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 450px;
    padding: 0 30px;
  }

  @media screen and (max-width: 640px) {
    width: 100%;
    height: 300px;
    padding: 0;
  }
`;

export const S_MainImageContentWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 30px;
  flex-direction: column;
`;

export const S_MainImg = styled.img<{ pathname: string }>`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
