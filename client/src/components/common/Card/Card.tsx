import React from 'react';
import CardImage from '../../../assets/imgs/image2.jpg';
import { S_CardWrap, S_CardContainer } from './Card.style';

function Card() {
  return (
    <S_CardWrap>
      <S_CardContainer src={CardImage} />
    </S_CardWrap>
  );
}

export default Card;
