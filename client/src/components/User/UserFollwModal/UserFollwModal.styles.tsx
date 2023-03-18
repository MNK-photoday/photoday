import styled from 'styled-components';

export const S_UserFollwModalContainer = styled.div`
  position: absolute;
  width: 200px;
  height: 280px;
  border: var(--color-input-box-line);
  border-radius: var(--box-radius-3);

  /* 
  위치 고민 중입니다...
  1번 위치
  */
  top: 125px;
  left: 50px;

  /* 2번 위치 */
  /* top: 340px;
  left: 300px; */

  /* 3번 위치 */
  /* top: 340px;
  display: flex; */
`;

export const S_UserFollwListContainer = styled.div`
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
`;
