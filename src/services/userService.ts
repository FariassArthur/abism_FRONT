import { api, requestConfig } from "../utils/config";

//axios
import axios, { AxiosResponse } from "axios";

const profile = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(api + "/users/profile", config);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const update = async (data: any, token: string) => {
  if (!token) {
    throw new Error("Token not found in localStorage");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res: AxiosResponse<any> = await axios.post(
      api + "/users/update",
      data,
      config
    );
    const responseData = res.data;

    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const takeAllUsers = async () => {
  try {
    const res = await axios.get(`${api}/users/all`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

const userService = {
  profile,
  update,
  takeAllUsers,
};

export default userService;
