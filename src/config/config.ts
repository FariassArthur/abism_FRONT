export const baseUrl = "https://backabism.vercel.app/";

interface data {
  method: string;
  data: any;
  token?: string;
  image?: string;
}

export const requestConfig = (
  method: data,
  data: data,
  token: data,
  image: data
) => {
  let config;

  if (image) {
    config = {
      method: method.method,
      body: data.data,
      headers: {},
    };
  } else if (method.method === "DELETE" || data.data === null) {
    config = {
      method: method.method,
      headers: {},
    };
  } else {
    config = {
      method: method.method,
      body: JSON.stringify(data.data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": ""
      },
    };
  }

  if (token.token && config.headers) {
    if (config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
  }

  return config;
};
