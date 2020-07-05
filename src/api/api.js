import * as axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.covid19api.com/",
});

export const covidAPI = {
  getCountries: async () => {
    const response = await axiosInstance.get("countries");
    return response;
  },
};
