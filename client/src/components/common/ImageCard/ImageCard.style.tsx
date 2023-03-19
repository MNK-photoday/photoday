import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RowFlex } from '../../../styles/GlobalStyles';

export const S_CardImagePicture = styled.div`
  margin: 10px;
  position: relative;
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

export const S_OverlayControls = styled.div`
  width: 100%;
  position: absolute;
  padding: 5px 20px;
  bottom: 0;
  box-sizing: border-box;
  opacity: 0;
  transition: 1s;
  background: linear-gradient(
    180deg,
    rgba(25, 27, 38, 0),
    rgba(25, 27, 38, 0.56)
  );
  ${S_CardImagePicture}:hover & {
    opacity: 1;
  }
`;

export const S_OverlayControlsBox = styled.div`
  ${RowFlex};
  justify-content: flex-start;
  transition: all 0.25s;
`;

export const S_IconBox = styled.div`
  margin-right: 15px;

  .like-icon {
    font-size: 20px;
    color: #fff;
    &:hover {
      cursor: pointer;
      color: var(--color-primary-green);
    }
  }
  .bookmark-icon {
    font-size: 18px;
    color: #fff;
    &:hover {
      cursor: pointer;
      color: var(--color-primary-green);
    }
  }
`;
