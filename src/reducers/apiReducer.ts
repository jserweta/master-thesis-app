interface State {
  data: any;
  isLoading: boolean;
  error: any;
}

type Action =
  | { type: "FETCHING" }
  | { type: "SUCCESS"; payload: any }
  | { type: "ERROR"; payload: any };

export const apiReducer = (state: State, action: Action) => {
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
