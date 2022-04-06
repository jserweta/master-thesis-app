export const apiReducer = (state, action) => {
  switch (action.type) {
    case "FETCHING":
      return { data: null, isLoading: true, error: null };
    case "SUCCESS":
      return { data: action.payload, isLoading: false, error: null };
    case "ERROR":
      return { data: null, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
