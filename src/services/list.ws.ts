import { List } from "../interfaces/List.model";
import { ListItem } from "../interfaces/ListItem.model";
import { api } from "./api.ws";

export const getList = async (id: number): Promise<List> => {
  try {
    const response = await api.get<List>("/mylist/" + id);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter lista:", error);
    throw error;
  }
};

export const postList = async (data: List[]): Promise<List> => {
  const response = await api.post<List>("/mylist", data);
  return response.data;
};

export const putList = async (data: List): Promise<List> => {
  const response = await api.put<List>("/mylist", data);
  return response.data;
};

export const deleteList = async (id: number): Promise<void> => {
  await api.delete<List>(`/mylist/${id}`);
};

export const deleteListItem = async (id: number): Promise<void> => {
  await api.delete<ListItem>(`/mylist/sublist/${id}`);
};

export const postListItem = async (data: ListItem[]): Promise<ListItem> => {
  const response = await api.post<ListItem>("/mylist/sublist", data);
  return response.data;
};

export const putListItem = async (data: ListItem): Promise<ListItem> => {
  const response = await api.put<ListItem>("/mylist/sublist", data);
  return response.data;
};
