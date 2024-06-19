import { api } from "../utils/config";
import axios from "axios";

const takePoems = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.get(api + "/poems/takepoems", config);
    return res.data;
  } catch (error) {
    console.error(error);
    return { error: ["Erro ao buscar poemas"] };
  }
};

const poemService = {
  takePoems,
};

export default poemService;
