export const api = "https://backabism.vercel.app";

export const requestConfig = (
  method: string,
  token?: string,
  image?: string
) => {
  let config = {};

  const headers = new Headers();

  if (image) {
    config = {
      method: method,
      headers: headers,
    };
  } else if (method === "DELETE") {
    config = {
      method: method,
      headers: headers,
    };
  } else {
    headers.append("Content-Type", "application/json");

    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    config = {
      method: method,
      headers: headers,
    };
  }

  return config;
};
