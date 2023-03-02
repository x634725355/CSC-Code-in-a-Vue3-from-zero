import { boot } from "quasar/wrappers";
import axios, { AxiosInstance } from "axios";


export class Request {
    private initConfig: RequestInit;
    public url: string;
    public contentType: string;

    constructor() {}

    getFetch() {}
}

const baseURL =
  process.env.NODE_ENV === 'development' ? '/' : 'https://yiyun.eki.space';

const api = axios.create({ baseURL });

export default boot(({ app }: any) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };

