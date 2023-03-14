import Button from '../../components/common/Button/Button';
import { Container, ContainerWrap } from '../../styles/Layout';
import {
  S_FileBox,
  S_Tag,
  S_TagBox,
  S_TagInput,
  S_UploadBottom,
  S_TagContainer,
  S_ButtonContainer,
  S_UploadBox,
  S_UploadTitle,
} from './Upload.styles';
import { IoClose } from 'react-icons/io5';
import { useRef } from 'react';

function Upload() {
  const chooseFileRef = useRef<HTMLInputElement>(null);

  const chooseFileHandler = () => {
    chooseFileRef.current?.click();
  };

  const inputTagHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  return (
    <ContainerWrap>
      <Container>
        <S_UploadBox>
          <S_UploadTitle>File Upload</S_UploadTitle>
          <S_FileBox>Drag files to upload</S_FileBox>
          <input type="file" accept="image/*" ref={chooseFileRef} />
          <S_UploadBottom>
            <S_TagContainer>
              <S_TagInput
                placeholder="add to tag"
                type="text"
                onChange={inputTagHandler}
              ></S_TagInput>
              <S_TagBox>
                <S_Tag>
                  임시태그 <IoClose className="close-icon" />
                </S_Tag>
              </S_TagBox>
            </S_TagContainer>
            <S_ButtonContainer>
              <Button
                variant={'primary'}
                shape={'round'}
                size={'medium'}
                buttonClickEvent={chooseFileHandler}
              >
                Choose file
              </Button>
              <Button variant={'point'} shape={'round'} size={'medium'}>
                Upload file
              </Button>
            </S_ButtonContainer>
          </S_UploadBottom>
        </S_UploadBox>
      </Container>
    </ContainerWrap>
  );
}

export default Upload;
