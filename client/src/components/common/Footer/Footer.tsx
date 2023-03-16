import {
  S_FooterContainer,
  S_FooterContainerWrap,
  S_FooterSpan,
} from './Footer.styles';

function Footer() {
  return (
    <S_FooterContainerWrap>
      <S_FooterContainer>
        <S_FooterSpan>
          © 2023 MNK-photoday Team. All rights reserved.
        </S_FooterSpan>
      </S_FooterContainer>
    </S_FooterContainerWrap>
  );
}

export default Footer;
