import axios from "axios";
import { createHash } from "crypto";
import config from "../config";

const axiosHttp = {
  marvelHttpApi: (() => {
    const instance = axios.create({
      baseURL: config.marvelEndpoint,
      params: {
        apikey: config.marvelPublicApiKey,
      },
    });

    // Para o servidor, adiciona o hash e o timestamp na requisição
    if (typeof window === "undefined") {
      instance.interceptors.request.use((options) => {
        const timestamp = Date.now();
        options.params.hash = createHash("md5")
          .update(
            `${timestamp}${config.onlyServer.marvelPrivateKey}${config.marvelPublicApiKey}`
          )
          .digest("hex");
        options.params.ts = timestamp;
        return options;
      });
    }

    return instance;
  })(),
};

export default axiosHttp;
