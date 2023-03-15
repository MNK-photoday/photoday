import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const S_CardImagePicture = styled.div`
  margin: 10px;
`;

export const S_CardImageLink = styled(Link)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
export const S_CardImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
`;
