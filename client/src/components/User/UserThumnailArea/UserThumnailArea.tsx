import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useRef, useState, useEffect, useContext } from 'react';
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
import { updateFile, deleteProfile } from '../../../api/User';
import { setData } from '../../../store/userSlice';
import { UploadImage } from '../../../pages/Upload/Upload';
import { setUserProfile } from '../../../store/authSlice';

export type User = {
  userData: UserData;
  myPage: boolean;
};

function UserThumnailArea({ userData, myPage }: User) {
  const dispatch = useDispatch();
  const [followModal, setFollowModal] = useState(false);
  const [currentTap, setCurrentTap] = useState('follower');
  const [file, setFile] = useState<UploadImage | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    uploadHandler();
  }, [file]);

  const clickFollowerModalHandler = () => {
    setFollowModal(!followModal);
    setCurrentTap('follower');
  };

  const clickFollowingModalHandler = () => {
    setFollowModal(!followModal);
    setCurrentTap('following');
  };

  const uploadClickHandler = () => {
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

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const fileList = e.target.files[0];

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
      uploadHandler();
    }
  };

  const uploadHandler = async () => {
    const FILE_SIZE_LIMIT = 1024 * 1024 * 10;
    if (!file) {
      return;
    } else if (file.file.size > FILE_SIZE_LIMIT) {
      return alert('File size should not exceed 10MB');
    }

    try {
      const response = await updateFile(file.file);
      dispatch(setData(response));
      const { profileImageUrl } = response.data;
      dispatch(setUserProfile(profileImageUrl));
      localStorage.setItem('userProfileImage', profileImageUrl);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          alert(error.response.data.message);
        }
      }
    }
  };

  const deleteProfileHandler = async () => {
    try {
      const response = await deleteProfile();
      dispatch(setData(response));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <S_UserThumnailArea>
      <S_UserProfileIamge alt="user profile" src={userData.profileImageUrl} />
      <S_UserFollowContainer>
        <S_UserFollowWrap onClick={clickFollowerModalHandler}>
          <S_UserFollowCount>{userData.followerCount}</S_UserFollowCount>
          <S_UserFollow>Follower</S_UserFollow>
        </S_UserFollowWrap>
        <S_UserFollowWrap onClick={clickFollowingModalHandler}>
          <S_UserFollowCount>{userData.followingCount}</S_UserFollowCount>
          <S_UserFollow>Following</S_UserFollow>
        </S_UserFollowWrap>
      </S_UserFollowContainer>
      {myPage && (
        <>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={fileChangeHandler}
            ref={inputFileRef}
          />
          <Button
            variant="point"
            shape="default"
            size="large"
            clickEventHandler={uploadClickHandler}
          >
            Upload Profile
          </Button>
          <Button
            variant="point"
            shape="default"
            size="XLarge"
            clickEventHandler={deleteProfileHandler}
          >
            Remove Profile
          </Button>
        </>
      )}
      {followModal && (
        <UserFollwModal
          tap={currentTap === 'follower' ? 'follower' : 'following'}
          myPage={myPage}
          setFollowModal={setFollowModal}
        />
      )}
    </S_UserThumnailArea>
  );
}

export default UserThumnailArea;
