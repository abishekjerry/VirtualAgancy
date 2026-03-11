import { userDetails, clearUserDetails } from "../../actionType/actionType";

export const saveUserDetails = (userData) => {
  console.log(userData, "hwegjhk");
  return {
    type: userDetails,
    payload: userData,
  };
};
export const clearUserData = () => ({
  type: clearUserDetails,
});
