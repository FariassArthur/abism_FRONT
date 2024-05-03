export const api = "https://backabism.vercel.app/";

export const requestConfig = (
  method: string,
  data: any,
  token?: string,
  image?: string
) => {
  let config;

  if (image) {
    config = {
      method: method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method: method,
      headers: {},
    };
  } else {
    config = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": ""
      },
    };
  }

  if (token && config.headers) {
    if (config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
};
