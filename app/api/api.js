import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchSymptomDataByDate = async (formattedDate) => {
  try {
    const response = await api.get(`/symptoms/${formattedDate}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching symptom data:", error);
    throw error;
  }
};

export const fetchSymptomDataByType = async (type) => {
  try {
    const response = await api.get(`/symptoms/type/${type}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching symptom data:", error);
    throw error;
  }
};
