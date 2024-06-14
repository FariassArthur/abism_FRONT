import axios, { AxiosResponse } from "axios";
import { api, requestConfig } from "../utils/config";

const register = async (data: any) => {
  const config = requestConfig("POST", data);

  try {
    const res: AxiosResponse<any> = await axios.post(
      api + "/users/create",
      data,
      config
    );
    const responseData = res.data;

    if (responseData.id_user) {
      localStorage.setItem("user", JSON.stringify(responseData.id_user));
      localStorage.setItem("token", JSON.stringify(responseData.token));
    }

    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Logout an user
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const login = async (data: any) => {
  try {
    const res: AxiosResponse<any> = await axios.post(
      api + "/users/login",
      data
    );
    const responseData = res.data;

    if (responseData.token) {
      localStorage.setItem("token", JSON.stringify(responseData.token));
    }

    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
