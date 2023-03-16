import LinkButton from '../../components/common/Button/LinkButton';
import {
  S_ButtonContainer,
  S_ErrorBox,
  S_ErrorPageContainer,
  S_ErrorPageWrap,
  S_ErrorSubTitleBold,
  S_ErrorSubTitleP,
  S_ErrorTitleH1,
  S_TextContainer,
} from './ErrorPage.style';

function ErrorPage() {
  return (
    <S_ErrorPageWrap>
      <S_ErrorPageContainer>
        <S_ErrorBox>
          <S_TextContainer>
            <S_ErrorTitleH1>404</S_ErrorTitleH1>
            <S_ErrorSubTitleBold>Page Not Found</S_ErrorSubTitleBold>
            <S_ErrorSubTitleP>
              The page you're looking for does not seem to exist
            </S_ErrorSubTitleP>
          </S_TextContainer>
          <S_ButtonContainer>
            <LinkButton variant="point" shape="default" size="large" url="/">
              Go to Home
            </LinkButton>
          </S_ButtonContainer>
        </S_ErrorBox>
      </S_ErrorPageContainer>
    </S_ErrorPageWrap>
  );
}

export default ErrorPage;
