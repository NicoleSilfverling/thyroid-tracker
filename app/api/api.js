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

export const fetchUserFirstname = async () => {
  try {
    const response = await api.get("/api/v1/user/firstname");
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

export const postSymptomData = async (data) => {
  try {
    const response = await api.post("/symptom", data);
    return response.data;
  } catch (error) {
    console.error("Error posting symptom data:", error);
    throw error;
  }
};

export const deleteSymptomData = async (id) => {
  try {
    const response = await api.delete(`/symptom/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting symptom data:", error);
    throw error;
  }
};
