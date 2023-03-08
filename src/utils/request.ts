import axios from "axios";

export const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:7777/' : 'https://yiyun.eki.space';

const api = axios.create({ baseURL });

export { api };

