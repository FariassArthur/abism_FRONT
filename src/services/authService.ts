import axios, { AxiosResponse } from "axios";

import { api, requestConfig } from "../utils/config";

const register = async (data: any) => {
  const config = requestConfig("POST", data);

  try {
    const res: AxiosResponse = await axios.post(api + "/users/create", config);
    const responseData = res.data;

    if (responseData.id_user) {
      localStorage.setItem("user", JSON.stringify(responseData.id_user));
      localStorage.setItem("token", JSON.stringify(responseData.token));
    }

    return responseData;
  } catch (error) {
    console.log(error);
  }
};

//Logout an user
const logout = () => {
  localStorage.removeItem("user");
};

const login = async (data: any) => {
  const config = requestConfig("POST", data);

  try {
    const res: AxiosResponse = await axios.get(api + "users/login", config);
    const responseData = res.data;

    if (responseData.id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return responseData;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
