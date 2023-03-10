import * as style from './Button.styles';
import { FcGoogle } from 'react-icons/fc';

export function GoogleButton(props: { text: string }) {
  return (
    <>
      <style.Button>
        <FcGoogle className="icon" size={20} />
        {props.text}
      </style.Button>
    </>
  );
}
export function Button(props: { text: string }) {
  return <style.Button>{props.text}</style.Button>;
}
