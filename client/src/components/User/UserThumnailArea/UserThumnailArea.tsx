import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  S_UserThumnailArea,
  S_UserProfileIamge,
  S_UserFollowContainer,
  S_UserFollowWrap,
  S_UserFollowCount,
  S_UserFollow,
} from './UserThumnailArea.styles';
import Button from '../../common/Button/Button';
import UserFollwModal from '../UserFollwModal/UserFollwModal';
import { UserData } from '../../../store/userSlice';
import { updateFile } from '../../../api/User';
import { setData } from '../../../store/userSlice';
import { UploadImage } from '../../../pages/Upload/Upload';

export type User = {
  userData: UserData;
  isMyPage: boolean;
};

function UserThumnailArea({ userData, isMyPage }: User) {
  const dispatch = useDispatch();
  const [followModal, setFollowModal] = useState(false);
  const [file, setFile] = useState<UploadImage | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleUpload();
  }, [file]);

  const clickFollowModalHandler = () => {
    setFollowModal(!followModal);
  };

  const uploadClickhandler = () => {
    inputFileRef.current?.click();
  };

  const fileSizeCalculator = (dataSize: number, unit: string) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const index = units.indexOf(unit.toUpperCase());
    let size = dataSize;

    for (let i = 0; i < index; i++) {
      size /= 1024;
    }

    return size.toFixed(2) + ' ' + units[index];
  };

  const fileChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const fileList = e.target.files[0];
      console.log(fileList);
      setFile((state) => {
        return {
          ...state,
          file: fileList,
          thumbnail: window.URL.createObjectURL(fileList),
          type: fileList.type,
          name: fileList.name,
          size: fileSizeCalculator(fileList.size, 'MB'),
        };
      });
      handleUpload();
    }
  };

  const handleUpload = async () => {
    const FILE_SIZE_LIMIT = 1024 * 1024 * 10;
    if (!file) {
      return;
    } else if (file.file.size > FILE_SIZE_LIMIT) {
      return alert('File size should not exceed 10MB');
    }

    try {
      const response = await updateFile(file.file);
      dispatch(setData(response));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          alert(error.response.data.message);
        }
      }
    }
  };

  return (
    <S_UserThumnailArea>
      <S_UserProfileIamge alt="user profile" src={userData.profileImageUrl} />
      <S_UserFollowContainer>
        <S_UserFollowWrap onClick={clickFollowModalHandler}>
          <S_UserFollowCount>{userData.followerCount}</S_UserFollowCount>
          <S_UserFollow>Follower</S_UserFollow>
        </S_UserFollowWrap>
        <S_UserFollowWrap onClick={clickFollowModalHandler}>
          <S_UserFollowCount>{userData.followingCount}</S_UserFollowCount>
          <S_UserFollow>Following</S_UserFollow>
        </S_UserFollowWrap>
      </S_UserFollowContainer>
      {isMyPage && (
        <>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={fileChangehandler}
            ref={inputFileRef}
          />
          <Button
            variant="point"
            shape="default"
            size="large"
            clickEventHandler={uploadClickhandler}
          >
            Upload Image
          </Button>
          <Button variant="point" shape="default" size="XLarge">
            Remove Image
          </Button>
        </>
      )}
      {followModal && <UserFollwModal setFollowModal={setFollowModal} />}
    </S_UserThumnailArea>
  );
}

export default UserThumnailArea;
