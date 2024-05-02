import { api, requestConfig } from "../utils/config";

const register = (data: any) => {
  const config = requestConfig("POST", data);
};

const authService = {
  register,
};

export default authService;
