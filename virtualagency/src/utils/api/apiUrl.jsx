const getBaseUrl = () => {
  const host = window.location.hostname;
  switch (host) {
    case "web.pmgasia.com":
      return "https://production-api-url/api";

    default:
      return "https://ebiz.pmgasia.com/iWeb/virtualagency/vagit/api";
  }
};

export const Base_Url = getBaseUrl();
export const Account_API = {
  Login : Base_Url + "/VA/Usersignon",
}

export const Language_API = {
  Language : Base_Url + "/VA/Language",
}

export const Dashboard_API ={
  Dashboard : Base_Url + "/VA/Viewdashboard",
  Master : Base_Url + "/VA/MasterDropdowns",
  GetDetails : Base_Url + "/VA/GetDetails",
}


export const ClientInfo_API ={
  AddUpdateClientInfo : Base_Url + "/VA/EnqClientinfo",
  ClientInfoMaster : Base_Url + "/VA/EnqClientinfoDropdowns",
  AddUpdateClientContant : Base_Url + "/VA/AddnewClient",
  AddUpdateBrand : Base_Url + "/VA/AddnewBrands",
  CheckforUsername: Base_Url + "/VA/CheckforUsername",
}

export const EnquiryDetails_API ={
  AddUpdateEnquiryDetails : Base_Url + "/VA/EnqProjectinfo",
  GetSlatemplateMaster : Base_Url + "/VA/GetSlatemplate",
}
 
export const LineItems_API ={
  AddUpdateLineItems : Base_Url + "/VA/EnqLineItemDetails",
  GetEnqLineItemsMaster : Base_Url + "/VA/EnqLineItemsDropdowns",
  GetEnqDuplicate : Base_Url + "/VA/EB_Duplicate"
}
export const Suppliers_API ={
  GetEnqSupplierMaster : Base_Url + "/VA/GetSupplier",
  AddUpdateSuppliers : Base_Url + "/VA/EnqSupplierInfo",
} 
