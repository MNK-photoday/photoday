import * as style from './Button.styles';
import { FcGoogle } from 'react-icons/fc';

export function GoogleButton(props: { text: string }) {
  return (
    <>
      <style.Button isGreen={false}>
        <FcGoogle className="google-icon" size={20} />
        {props.text}
      </style.Button>
    </>
  );
}
