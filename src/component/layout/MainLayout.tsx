import MainContent from "./mainContent";
import Navbar from "./navbar";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

export default function MainLayout() {
  return (
    <Wrapper>
      <Navbar />
      <MainContent />
    </Wrapper>
  );
}
