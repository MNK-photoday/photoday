import { useRef, useState } from 'react';

import Button from '../../components/common/Button/Button';
import { Container, ContainerWrap } from '../../styles/Layout';
import {
  S_FileBox,
  S_TagInput,
  S_UploadBottom,
  S_TagContainer,
  S_ButtonContainer,
  S_UploadBox,
  S_UploadTitle,
} from './Upload.styles';
import TagList from '../../components/Upload/Tag/TagList';

type UploadImage = {
  file: File;
  thumbnail: string;
  type: string;
};

export type Tags = {
  id: number;
  name: string;
};

function Upload() {
  const chooseFileRef = useRef<HTMLInputElement>(null);

  const [imagefile, setImagefile] = useState<UploadImage | null>(null);

  const [tags, setTags] = useState<Tags[]>([]);
  const [tagCount, setTagCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState('');

  const fileInputClickHandler = () => {
    chooseFileRef.current?.click();
  };

  const uploadImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const fileList = event.target.files;
      setImagefile({
        file: fileList[0],
        thumbnail: URL.createObjectURL(fileList[0]),
        type: fileList[0].type,
      });
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    setImagefile({
      file: fileList[0],
      thumbnail: URL.createObjectURL(fileList[0]),
      type: fileList[0].type,
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const inputTagHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const createTagHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue !== '') {
      setTags([...tags, { id: tagCount, name: inputValue }]);
      setTagCount(tagCount + 1);
      setInputValue('');
    }
  };
  const removeTagHandler = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <ContainerWrap>
      <Container>
        <S_UploadBox>
          <S_UploadTitle>File Upload</S_UploadTitle>
          <S_FileBox onDrop={handleDrop} onDragOver={handleDragOver}>
            Drag files to upload
            <input
              type="file"
              accept="image/*"
              ref={chooseFileRef}
              style={{ display: 'none' }}
              onChange={uploadImageHandler}
            />
          </S_FileBox>
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
                value={inputValue}
                onChange={inputTagHandler}
                onKeyPress={createTagHandler}
              ></S_TagInput>
              <TagList tags={tags} onRemove={removeTagHandler} />
            </S_TagContainer>
            <S_ButtonContainer>
              <Button
                variant={'primary'}
                shape={'round'}
                size={'medium'}
                clickEventHandler={fileInputClickHandler}
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
