import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  background: linear-gradient(
    to bottom,
    rgba(241, 226, 202, 1) 0%,
    rgba(189, 157, 107, 0.95) 46%,
    rgba(178, 141, 83, 0.94) 62%,
    rgba(231, 212, 182, 0.9) 100%
  );
  border-bottom: rgb(97, 76, 31) 1px;
  border-radius: 6px;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 120px;
  padding: 25px;
`;
export const MiscelaneousContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Signed = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SignOut = styled.div`
  padding: 10px 15px;
  cursor: pointer;
`;

export const User = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
export const SignIn = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

export const UserInfoContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export const UserInfo = styled.div`
  padding: 10px 15px;
`;
