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

const takePoemById = async (id: string) => {
  /*   if (!token) {
    throw new Error("Token not found in localStorage");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
 */
  try {
    const res = await axios.get(`${api}/poems/${id}`);

    return res.data;
  } catch (error) {
    return { "Erro ao buscar poema pelo ID": error };
  }
};

const takeUserPoems = async (token: any) => {
  if (!token) {
    throw new Error("Token not found in localStorage");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.get(`${api}/poems/poemuser`, config);

    return res.data;
  } catch (err) {
    return { "Erro no serviço de busca pelos poemas do usuário": err };
  }
};

const editPoemService = async (data: any, token: any) => {
  if (!token) {
    throw new Error("Token not found in localStorage");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.patch(`${api}/poems/update/${data.id}`, data, config);
  } catch (error) {
    return { "Erro no serviço de edição dos poemas": error };
  }
};

const deletePoem = async (id: string, token: any) => {
  if (!token) {
    throw new Error("Token not found in localStorage");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.delete(`${api}/poems/delete/${id}`, config);
  } catch (error) {
    return { "Erro ao excluir poema": error };
  }
};

const poemService = {
  takePoems,
  createPoem,
  takePoemById,
  takeUserPoems,
  editPoemService,
  deletePoem,
};

export default poemService;
