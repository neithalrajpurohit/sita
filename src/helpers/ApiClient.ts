import axios from "axios";
import { ApiVersion, EndPoints } from "./ApiEndPoints";

//for private request

//http://devsita.netrum-tech.com/api/v1
// export const DEV_HOST_NAME = "http://devsita.netrum-tech.com/api/v1";
export const DEV_HOST_NAME = "https://etek.dev.netrum-tech.com/api/v1";
const getBaseUrl = () => {
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === DEV_HOST_NAME
  ) {
    return DEV_HOST_NAME;
  }
  return `${window.location.protocol}//${window.location.hostname}/api${ApiVersion}`;
};

export const axiosPrivate = axios.create({
  baseURL: getBaseUrl(),
});

export const sharePdfAxios = axios.create({
  baseURL: getBaseUrl(),
});
sharePdfAxios.defaults.headers.common["Content-Type"] = "Application/json";
axiosPrivate.interceptors.request.use((request) => {
  request.headers = {
    "Content-Type": "Application/json",
    Authorization:
      "Bearer" +
      " " +
      JSON.parse(sessionStorage.getItem("userTokens") || "{}")?.accessToken,
  };
  return request;
});

axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const prevRequest = error?.config;
    if (error.response.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = await refreshToken();
      prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return axiosPrivate(prevRequest);
    }
    throw new Error(error);
  }
);

// File Upload
export const axiosPrivateFileUpload = axios.create({
  baseURL: getBaseUrl(),
});

axiosPrivateFileUpload.interceptors.request.use((request) => {
  request.headers = {
    Authorization:
      "Bearer" +
      " " +
      JSON.parse(sessionStorage.getItem("userTokens") || "{}")?.accessToken,
  };
  return request;
});

axiosPrivateFileUpload.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const prevRequest = error?.config;
    if (error.response.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = await refreshToken();
      prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return axiosPrivate(prevRequest);
    }
    throw new Error(error);
  }
);

//public

export const public_url = getBaseUrl();

const reactApiPublicUrl = public_url?.replace(ApiVersion, "");
export const axiosPublic = axios.create({
  baseURL: reactApiPublicUrl,
});

axiosPublic.interceptors.request.use((request) => {
  request.headers = {
    "Content-Type": "Application/json",
  };
  return request;
});

export const refreshToken = async () => {
  const refreshToken = JSON.parse(
    sessionStorage.getItem("userTokens") || "{}"
  )?.refreshToken;
  try {
    const response = await axiosPublic.post(EndPoints.REFRESHTOKEN, {
      refresh: refreshToken,
    });

    setUserTokens({
      accessToken: response.data.access,
      refreshToken: response.data.refresh,
    });
    return response.data.access;
  } catch (error) {
    console.error(error);
  }
};

export const setUserTokens = (userTokens: {
  accessToken: string;
  refreshToken: string;
}) => {
  sessionStorage.setItem("userTokens", JSON.stringify(userTokens));
};
