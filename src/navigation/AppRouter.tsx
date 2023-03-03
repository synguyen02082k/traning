import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages";
import UserPage from "../pages/user";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<UserPage />} />
    </Routes>
  );
};

export default AppRouter;
