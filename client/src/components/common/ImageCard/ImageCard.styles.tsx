import { FaBookmark, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RowFlex } from '../../../styles/GlobalStyles';

export const S_CardImagePicture = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
`;

export const S_CardImageLink = styled(Link)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
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
`;

export const Heart = styled(FaHeart)<{ activelike: any }>`
  font-size: 20px;
  color: ${({ activelike }) =>
    activelike === 'true' ? 'var(--color-primary-green)' : '#fff'};
  &:hover {
    cursor: pointer;
    color: var(--color-primary-green);
  }
`;

export const Bookmark = styled(FaBookmark)<{ activebookmark: any }>`
  font-size: 18px;
  color: ${({ activebookmark }) =>
    activebookmark === 'true' ? 'var(--color-primary-green)' : '#fff'};
  &:hover {
    cursor: pointer;
    color: var(--color-primary-green);
  }
`;
