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
  Login : Base_Url + "/VA/USersignon",
}

export const Language_API = {
  Language : Base_Url + "/VA/Language",
}

