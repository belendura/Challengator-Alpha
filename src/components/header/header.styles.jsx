import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/belt1.svg";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoPicture = styled(Logo)`
  width: 60%;
  padding: 5px 5px;
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
`;
