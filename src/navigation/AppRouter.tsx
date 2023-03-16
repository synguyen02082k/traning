import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import MainLayout from "../component/layout/MainLayout";
import Dashboard from "../pages";
import Login from "../pages/login";
import UserPage from "../pages/user";

const ProtectedRoute = ({ children }: any) => {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  return children ? children : <Outlet />;
};
const PublicRoute = ({ children }: any) => {
  const user = localStorage.getItem("user");
  if (user) {
    return <Navigate to={"/users"} replace />;
  }
  return children ? children : <Outlet />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/users" element={<UserPage />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
