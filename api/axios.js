import axios from "axios";
const BASE_URL = "https://652e5be70b8d8ddac0b13c1c.mockapi.io";

const axiosOne = axios.create({
  baseURL: BASE_URL,
});

export const getOrchids = async (category) => {
  const response = await axiosOne.get(`/orchids?category=${category}`);

  return response.data;
};

export const getOrchidById = async (id) => {
  const response = await axiosOne.get(`/orchids/${id}`);
  return response.data;
};
