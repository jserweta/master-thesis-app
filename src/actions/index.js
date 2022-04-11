import { API_KEY, API_URL } from "../constants/global";

export const doFetch = async (path) => {
  const res = await fetch(`${API_URL}${path}&apikey=${API_KEY}`);
  let response = await res.json();

  if ("Meta Data" in response) {
    return response;
  }
  throw response;
};
