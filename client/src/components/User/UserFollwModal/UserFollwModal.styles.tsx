import styled from 'styled-components';
import { ColFlex } from '../../../styles/GlobalStyles';

export const S_UserFollwModalContainer = styled.div`
  position: absolute;
  width: 210px;
  height: 280px;
  border: var(--color-input-box-line);
  border-radius: var(--box-radius-3);
  background-color: var(--white);
  top: 270px;
  z-index: 1;
`;

export const S_UserFollwListContainer = styled.div`
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: var(--color-primary-gray20);
  }
`;

export const S_NoFollowGuide = styled.div`
  ${ColFlex}
  height: 100%;
  align-items: center;
  color: var(--color-primary-green);
  .peopleIcon {
    margin-bottom: 5px;
  }

  span {
    color: var(--color-primary-black);
  }
`;
