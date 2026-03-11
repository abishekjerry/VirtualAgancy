export const Base_Url = "https://localhost:7174/api";

// For department-related APIs
export const SendOtp_Api = "http://localhost:5000/send-otp";
export const SendEmail_Api = "http://localhost:5000/send-email";
export const Department_Api = {
  GetDropdownValues: Base_Url + "/Master/GetDropdownValues",
  InsertAndUpdate: `${Base_Url}/Department/AddUpdateDepartment`,
  DepartmentSummary: Base_Url + "/Department/GetDepartmentSummary",
  DeleteDepartment: Base_Url + "/Department/DeleteDepartmentDetails",
  makeVisible: Base_Url + "/Department/makeVisible",
  makePublic: Base_Url + "/Department/makePublic",
};

