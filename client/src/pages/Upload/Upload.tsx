import { Container, ContainerWrap, Content } from '../../styles/Layout';
import * as style from './Upload.styles';

function Upload() {
  return (
    <ContainerWrap>
      <Container>
        <style.UploadBox>
          <style.UploadTitle>File Upload</style.UploadTitle>
          <style.FileBox>Drag files to upload</style.FileBox>
          <style.UploadBottom>
            <div>
              <input type="text" />
              <div>생성된 태그 영역</div>
            </div>
            <div>
              <div>choose file</div>
              <div>upload</div>
            </div>
          </style.UploadBottom>
        </style.UploadBox>
      </Container>
    </ContainerWrap>
  );
}

export default Upload;
