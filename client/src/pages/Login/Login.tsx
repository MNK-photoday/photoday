import { Outlet } from 'react-router-dom';
import * as style from './Login.styles';

function Login() {
  return (
    <style.LoginContainerWrap>
      <style.ImgContainerWrap />
      <style.InputContainerWrap>
        <Outlet />
      </style.InputContainerWrap>
    </style.LoginContainerWrap>
  );
}

export default Login;
