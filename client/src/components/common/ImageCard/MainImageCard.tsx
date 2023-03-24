import {
  S_MainImageContentBox,
  S_MainImageContentWrap,
  S_MainImg,
  S_MainImgBox,
} from './MainImageCard.styles';
import img5 from '../../../assets/imgs/image5.jpg';
import img6 from '../../../assets/imgs/image6.jpg';
import img7 from '../../../assets/imgs/image7.jpg';
import img8 from '../../../assets/imgs/image8.jpg';
import img9 from '../../../assets/imgs/image9.jpg';
import img10 from '../../../assets/imgs/image10.jpg';
import img11 from '../../../assets/imgs/image11.jpg';
import { useEffect, useState } from 'react';
import MainSkeleton from '../Skeleton/MainSkeleton';

function MainImageCard() {
  /*데이터 호출 전에 테스트 코드입니다. */
  const Mainimages: string[] = [img5, img6, img7, img8, img9, img10, img11];
  const [isloading, setIsLoading] = useState(true);
  const [mainImg, serMainImg] = useState({
    url1: '',
    url2: '',
  });

  useEffect(() => {
    const randomNum1 = Math.floor(Math.random() * Mainimages.length);
    const randomNum2 = Math.floor(Math.random() * Mainimages.length);
    setIsLoading(true);
    serMainImg({
      url1: Mainimages[randomNum1],
      url2: Mainimages[randomNum2],
    });
    setIsLoading(false);
  }, []);

  return (
    <S_MainImageContentBox>
      {isloading ? (
        <MainSkeleton count={2} height={420} />
      ) : (
        <S_MainImageContentWrap>
          <S_MainImgBox to="/">
            <S_MainImg src={mainImg.url1} alt="인기있는 이미지"></S_MainImg>
          </S_MainImgBox>
          <S_MainImgBox to="/">
            <S_MainImg src={mainImg.url2} alt="인기있는 이미지"></S_MainImg>
          </S_MainImgBox>
        </S_MainImageContentWrap>
      )}
    </S_MainImageContentBox>
  );
}

export default MainImageCard;
