import { User } from "../../generated/graphql";
import { axios } from "../axios";

const getMe = () => axios.get("/me");

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
const getUsers = async ({
  pageParam = 1,
  perPage = 20,
  search,
  sort,
}: UsersQueryParams) => {
  return await axios
    .get(
      `/users?page=${pageParam}&perPage=${perPage}&search=${JSON.stringify(
        search
      )}&sort=${sort}`
    )
    .then((data) => data.data);
};

const updateUser = (id: string, data: IUser) => axios.put(`/user/${id}`, data);

export {
  createUserApi,
  getUser,
  updateUser,
  login,
  refreshTokenApi,
  getUsers,
  getMe,
};

export interface IUser {
  fullName: string;
  DOB: Date;
  division: string;
  active: boolean;
}

export interface UsersQueryParams {
  pageParam?: number;
  perPage?: number;
  search?: any;
  sort?: any;
}

export interface UsersResponse {
  page?: number;
  totalCount: number;
  users: User;
}
