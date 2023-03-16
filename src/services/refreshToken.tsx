import { refreshTokenApi } from "./api/user.api";

const refreshToken = async () => {
  try {
    const data = await refreshTokenApi();
    localStorage.setItem("token", data.data.accessToken);
    return data;
  } catch (error) {}
};

export default refreshToken;
