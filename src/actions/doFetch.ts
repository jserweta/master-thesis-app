import { API_KEY, API_URL } from "../constants/api";

export const doFetch = async (path: String) => {
  const res = await fetch(`${API_URL}${path}&apikey=${API_KEY}`);
  let response = await res.json();

  if ("Meta Data" in response) {
    return response;
  } else if (
    "bestMatches" in response &&
    response["bestMatches"].length !== 0
  ) {
    return response;
  }
  throw response;
};
