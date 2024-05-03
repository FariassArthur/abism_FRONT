import axios, { AxiosResponse } from "axios";

import { api, requestConfig } from "../utils/config";

const register = async (data: any) => {
  const config = requestConfig("POST", data);

  try {
    const res:  AxiosResponse = await axios.post(api + "users/register", config)
    const responseData = res.data

    if(responseData.id) {
      
    }

    return responseData

  } catch (error) {
    console.log(error);
  }

};

const authService = {
  register,
};

export default authService;
