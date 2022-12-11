import axios from "axios";
import config from "../config";

const axiosHttp = {
  marvelHttpApi: axios.create({
    baseURL: config.marvelEndpoint,
    params: {
      apiKey: config.marvelPublicApiKey,
    },
  }),
};

export default axiosHttp;
