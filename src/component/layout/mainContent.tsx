import styled from "styled-components";
import UserPage from "../../pages/user";
const Wrapper = styled.div`
  width: 90%;
  padding: 10px 10px 10px 10px;
`;

const MainContent = () => {
  return (
    <Wrapper>
      MainContent
      <UserPage />
    </Wrapper>
  );
};

export default MainContent;
