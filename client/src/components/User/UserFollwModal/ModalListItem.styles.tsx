import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const S_ModalListItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100;
  height: 25%;
  background-color: var(--white);
  border-bottom: var(--color-input-box-line);

  .follwIcon {
    color: var(--color-primary-green);

    &:hover {
      transform: translateY(-1px);
      color: #5bcc8a;
    }
  }
`;

export const S_UserProfile = styled.img`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  margin: 10px;
`;

export const S_UserIntroductionWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5px;
  width: 50%;
`;

export const S_UserName = styled(Link)`
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm);
  font-weight: bold;
  margin-bottom: 5px;
  margin-right: 15px;
  height: 40px;
`;
