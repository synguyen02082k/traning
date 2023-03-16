import styled from "styled-components";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useCallback } from "react";
import "./navbar.scss";

const NavbarWrapper = styled.div`
  width: 200px;
  background-color: white;
  height: 100%;
  box-shadow: 0 3px 1px rgba(0, 0, 0, 0.15), 0 2px 2px rgba(0, 0, 0, 0.15),
    0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.15);
`;

export default function Navbar() {
  const renderNavLinkClassName = useCallback(
    ({ isActive }: { isActive: boolean }) => classNames(`nav_link ${isActive}`),
    []
  );

  return (
    <NavbarWrapper>
      <NavLink to="" className={renderNavLinkClassName}>
        Dashboard
      </NavLink>
      <NavLink className={renderNavLinkClassName} to="users">
        Users
      </NavLink>
    </NavbarWrapper>
  );
}
