import { axios } from "../axios";

const createUserApi = (user: IUser) => {
  return axios.post("/users", user);
};

const refreshTokenApi = () => {
  return axios.post("/token");
};

const login = (user: { email: string; password: string }) => {
  return axios.post("/login", user);
};

const getUser = (id: string) => axios.get(`/user/${id}`);

const updateUser = (id: string, data: IUser) => axios.put(`/user/${id}`, data);

export { createUserApi, getUser, updateUser, login, refreshTokenApi };

export interface IUser {
  fullName: string;
  DOB: Date;
  division: string;
  active: boolean;
}
