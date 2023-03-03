import styled from "styled-components";
import { Link } from "react-router-dom";

const NavbarWraper = styled.div`
  width: 200px;
  background-color: #8baeb3;
  height: 100%;
`;

const CustomLink = styled(Link)`
  display: block;
  padding: 5px 10px 10px 5px;
`;

export default function Navbar() {
  return (
    <NavbarWraper>
      <CustomLink to={"/"}>Dashboard</CustomLink>
      <CustomLink to={"/users"}>Users</CustomLink>
    </NavbarWraper>
  );
}
