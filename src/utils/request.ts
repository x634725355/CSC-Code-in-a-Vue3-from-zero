import axios from "axios";

export const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:7777/' : 'https://csc-code-in-a-node-js-from-zero.vercel.app/';

const api = axios.create({ baseURL });

export { api };

