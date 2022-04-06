import { useReducer, useEffect } from "react";
import { doFetch } from "../actions";
import { apiReducer } from "../reducers/apiReducer";

export const useApi = (path) => {
  const [response, dispatch] = useReducer(apiReducer, {
    data: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: "FETCHING" });
    doFetch(path)
      .then((data) => dispatch({ type: "SUCCESS", payload: data }))
      .catch((error) => dispatch({ type: "ERROR", payload: error }));
  }, [path]);

  return response;
};
