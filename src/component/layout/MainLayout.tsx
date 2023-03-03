import Navbar from "./navbar";
import styled from "styled-components";
import AppRouter from "../../navigation/AppRouter";
import { BrowserRouter } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const MainContent = styled.div`
  width: 100%;
  padding: 10px 10px 10px 10px;
  overflow-x: scroll;
`;

export default function MainLayout() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Navbar />
        <MainContent>
          <AppRouter />
        </MainContent>
      </Wrapper>
    </BrowserRouter>
  );
}
