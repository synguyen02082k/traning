import Navbar from "./navbar";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const MainContent = styled.div`
  width: 100%;
  padding: 10px 10px 10px 10px;
  overflow-x: scroll;
`;

export default function MainLayout({ children }: any) {
  return (
    <Wrapper>
      <Navbar />
      <MainContent>{children}</MainContent>
    </Wrapper>
  );
}
