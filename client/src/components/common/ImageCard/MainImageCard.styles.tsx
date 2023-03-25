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
    padding: 30px 0;
  }
`;

export const S_MainImageContentWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const S_MainImg = styled.img<{ pathname: string }>`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  object-fit: cover;
  position: ${({ pathname }) => pathname === '/' && 'absolute'};
`;

export const S_MainImageCardBox = styled.div`
  width: 100%;
  display: grid;
  height: 100%;
  row-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(700px, 1fr));
`;
