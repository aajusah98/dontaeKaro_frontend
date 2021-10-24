import axios from '../config/axiosInstance';
import {
  ADD_PRODUCT,
  ADD_CATEGORY,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_USER,
  GET_USERS,
  GET_USER_PROFILE,
  LOGIN,
  REGISTERATION,
  UPDATE_USER,
  GET_CATEGORY,
  GET_SUB_CATEGORY_BY_CATEGORY_ID,
  GET_SUB_CATEGORY,
  UPDATE_CATEGORY,
  UPDATE_PRODUCT
} from '../constants/URLS.CONSTANT';

export const registerUser = (data) => {
  return axios.post(REGISTERATION, data);
};

export const login = (data) => {
  return axios.post(LOGIN, data);
};

export const getProducts = () => {
  return axios.get(GET_PRODUCTS);
};

export const addProducts = (data) => {
  return axios.post(ADD_PRODUCT, data);
};

export const addCategory = (data) => {
  return axios.post(ADD_CATEGORY, data);
};

export const updateProduct = (id, data) => {
  return axios.put(UPDATE_PRODUCT + id, data);
};

export const updateCategory = (id, data) => {
  return axios.put(UPDATE_CATEGORY + id, data);
};

export const getProductsByUser = (id) => {
  return axios.get(GET_PRODUCTS_BY_USER + id);
};

export const getUsers = () => {
  return axios.get(GET_USERS);
};

export const getUserProfile = (id) => {
  return axios.get(GET_USER_PROFILE + id);
};

export const updateUserProfile = (id, data) => {
  return axios.put(UPDATE_USER + id, data);
};

export const getCategory = () => {
  return axios.get(GET_CATEGORY);
};

export const getCategoryBySubCategoryId = (id) => {
  return axios.get(GET_SUB_CATEGORY_BY_CATEGORY_ID + id);
};

export const getSubCategory = () => {
  return axios.get(GET_SUB_CATEGORY);
};
