import axios from "axios";

import { api, requestConfig } from "../utils/config";

const register = async (data: any) => {
  const config = requestConfig("POST", data);

  try {
    const res = await axios.get(api + "users/register", config)
    

  } catch (error) {
    
  }
};

const authService = {
  register,
};

export default authService;
