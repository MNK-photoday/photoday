import * as style from './LinkText.styles';

interface IProps {
  text: string;
  linkTo: string;
}

function LinkText(props: IProps) {
  return (
    <style.LinkToTextContainer>
      <style.LinkToText>
        {props.text}
        <style.LinkTo to={props.linkTo[0] === 'L' ? '/login' : '/signup'}>
          {props.linkTo}
        </style.LinkTo>
      </style.LinkToText>
    </style.LinkToTextContainer>
  );
}

export default LinkText;
