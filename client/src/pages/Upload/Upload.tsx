import { IoClose } from 'react-icons/io5';
import { useRef, useState } from 'react';

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

type UploadImage = {
  file: File;
  thumbnail: string;
  type: string;
};

function Upload() {
  const chooseFileRef = useRef<HTMLInputElement>(null);

  const [imagefile, setImagefile] = useState<UploadImage | null>(null);

  const fileInputClickHandler = () => {
    chooseFileRef.current?.click();
  };

  const uploadImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const fileList = event.target.files;
      if (fileList.length > 0) {
        setImagefile({
          file: fileList[0],
          thumbnail: URL.createObjectURL(fileList[0]),
          type: fileList[0].type,
        });
      }
    }
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
          <input
            type="file"
            accept="image/*"
            ref={chooseFileRef}
            onChange={uploadImageHandler}
          />
          {/* 아래는 미리보기 기능을 위한 임시 코드입니다. */}
          {imagefile && (
            <div>
              <img src={imagefile.thumbnail} alt="thumbnail" />
            </div>
          )}
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
                buttonClickEvent={fileInputClickHandler}
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
