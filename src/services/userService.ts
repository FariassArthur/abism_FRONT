import { api, requestConfig } from "../utils/config";

//axios
import axios, { AxiosResponse } from "axios";

const profile = async (token: any) => {
  const config = requestConfig("GET", token);

  try {
    const res = await axios.get(api + "/users/profile", token);

    return res.data;
    console.log(res.data)
  } catch (error) {
    throw error;
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

const userService = {
  profile,
  update,
};

export default userService;
