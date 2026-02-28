import axios from "axios";
import process from "process";

const apiKey = process.env.API_KEY;

export const vtunaijaApi = axios.create({
  baseURL: "https://vtunaija.com.ng/api",
  headers: {
    Authorization: `Token ${apiKey}`,
    "Content-Type": "application/json",
  },
  timeout: 4000,
});
