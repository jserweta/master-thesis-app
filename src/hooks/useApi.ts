import { useReducer, useEffect } from "react";
import { doFetch } from "../actions";
import { apiReducer } from "../reducers/apiReducer";

export const useApi = (path: string) => {
  const [response, dispatch] = useReducer(apiReducer, {
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: "FETCHING" });
    doFetch(path)
      .then((data) => dispatch({ type: "SUCCESS", payload: data }))
      .catch((data) => dispatch({ type: "ERROR", payload: data }));
  }, [path]);

  return response;
};
