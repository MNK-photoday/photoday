import { Container, ContainerWrap, Content } from '../../styles/Layout';
import * as style from './Detail.styles';
import img from '../../assets/imgs/image1.jpg';
function Detail() {
  return (
    <ContainerWrap>
      <Container>
        <style.DetailBox>
          <style.PicBox>
            <style.ContentsTop>
              <div>유저영역</div>
              <div>아이콘영역</div>
            </style.ContentsTop>
            <style.Contents>
              <img src={img} alt="테스트이미지" />
            </style.Contents>
            <style.ContentsBottom>
              <div>조회수,좋아요수 영역</div>
              <div>다운로드영역</div>
            </style.ContentsBottom>
          </style.PicBox>
          <style.TagBox>태그영역</style.TagBox>
          <style.SeachList>관련사진영역</style.SeachList>
        </style.DetailBox>
      </Container>
    </ContainerWrap>
  );
}

export default Detail;
