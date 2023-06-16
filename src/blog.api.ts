import { BlogDto, FormInputs } from "./types";
import axios from "axios";
import { baseURL } from "./consts";

const instance = axios.create({ baseURL });

export const getAllBlogs = async () => {
  try {
    const response = await instance.get('blogs');
    return response.data
  } catch (error) {
    console.error(error);
  }
}

export const getSingleBlog = async (id: string) => {
  try {
    const response = await instance.get(`blogs/${id}`);
    return response.data
  } catch (error) {
    console.error(error);
  }
}

export const addBlog = async (body: FormInputs) => {
  try {
    await instance.post(`blogs`, body);
  } catch (error) {
    console.error(error);
  }
}

export const updateBlog = async (id: string, body: FormInputs) => {
  try {
    await instance.put(`blogs/${id}`, body);
  } catch (error) {
    console.error(error);
  }
}

export const deleteBlog = async (id: string) => {
  try {
    await instance.delete(`blogs/${id}`);
  } catch (error) {
    console.error(error);
  }
}

export const searchBlog = async (text: string) => {
  try {
    const response = await instance.get(`blogs/search/text?text=${encodeURI(text)}`);
    return response.data
  } catch (error) {
    console.error(error);
  }
}