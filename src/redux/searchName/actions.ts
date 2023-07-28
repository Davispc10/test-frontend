import SearchNameActionTypes from "./action-types";

export const searchName = (payload: string) => ({
  type: SearchNameActionTypes.WRITE,
  payload,
});
