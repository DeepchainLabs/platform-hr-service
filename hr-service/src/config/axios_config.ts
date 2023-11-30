import axios from "axios";
import * as dotenv from "dotenv";
import { iAxios } from "src/common/interfaces/axios.interface";
import { configs } from "./chatbot_configs";
dotenv.config();

const axiosInstance = axios.create({
  baseURL: configs.apiBaseUrl,
  // withCredentials: true,
  // crossDomain: true
});

const getAxios = (info: iAxios<any | FormData, any>) => {
  return new Promise((resolve, reject) => {
    const {
      url,
      params = {},
      data = {},
      method = "get",
      dataType = "Json",
    } = info;
    // const withCredentials = true;

    const headers = {
      Authorization: "Bearer " + configs.apiBearerToken,
      "Content-Type":
        dataType === "FormData"
          ? "multipart/form-data"
          : "application/json;charset=UTF-8",
    };

    // axiosInstance.withCredentials = true;
    axiosInstance
      .request({ method, url, data, headers, params })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getAxios };
