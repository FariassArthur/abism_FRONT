import { api, requestConfig } from "../utils/config";
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

const createPoem = async (data: any, token: any) => {
  if (!token) {
    throw new Error("Token not found in localStorage");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.post(api + "/poems/create", data, config);
  } catch (err) {
    return { "Erro ao criar o poema, checar a API": err };
  }
};

const takePoemById = async (id: number) => {
  
}

const poemService = {
  takePoems,
  createPoem,
  takePoemById
};

export default poemService;
