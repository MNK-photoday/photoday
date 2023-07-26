import styled from 'styled-components';
import Spinner from '../../assets/imgs/Spinner-1s-200px.gif';

const SpinnerContainer = styled.div``;

function MainImageLoding() {
  return (
    <SpinnerContainer>
      <img src={Spinner} alt="로딩중" />
    </SpinnerContainer>
  );
}

export default MainImageLoding;
