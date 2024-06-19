import { api } from "../utils/config";

//axios
import axios, { AxiosResponse } from "axios";

const takePoems = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.get(api + "/users/takePoems", config);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const poemService = {
  takePoems,
};

export default poemService;
