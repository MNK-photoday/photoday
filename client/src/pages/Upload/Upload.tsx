import Button from '../../components/common/Button/Button';
import { Container, ContainerWrap } from '../../styles/Layout';
import {
  S_FileBox,
  S_Tag,
  S_TagBox,
  S_TagInput,
  S_UploadBottom,
  S_UploadBottomLeft,
  S_UploadBottomLight,
  S_UploadBox,
  S_UploadTitle,
} from './Upload.styles';
import { IoClose } from 'react-icons/io5';

function Upload() {
  const InputTagHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  return (
    <ContainerWrap>
      <Container>
        <S_UploadBox>
          <S_UploadTitle>File Upload</S_UploadTitle>
          <S_FileBox>Drag files to upload</S_FileBox>
          <S_UploadBottom>
            <S_UploadBottomLeft>
              <S_TagInput
                placeholder="add to tag"
                type="text"
                onChange={InputTagHandler}
              ></S_TagInput>
              <S_TagBox>
                <S_Tag>
                  임시태그 <IoClose className="close-icon" />
                </S_Tag>
              </S_TagBox>
            </S_UploadBottomLeft>
            <S_UploadBottomLight>
              <Button
                variant={'primary'}
                shape={'round'}
                size={'medium'}
                fullWidth={false}
                disabled={false}
              >
                Choose file
              </Button>
              <Button
                variant={'point'}
                shape={'round'}
                size={'medium'}
                fullWidth={false}
                disabled={false}
              >
                Upload file
              </Button>
            </S_UploadBottomLight>
          </S_UploadBottom>
        </S_UploadBox>
      </Container>
    </ContainerWrap>
  );
}

export default Upload;
