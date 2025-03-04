import {  useQuery } from "@tanstack/react-query";
import $api from '../utils/helpers/axiosInstance';
import { IKeys } from "../utils/models/KeyModel";
import { IUserModel } from "../utils/models/UserModel";
import { LocalStorage } from "./LocalStorage";
import { USER } from "../utils/constants/LocalStorageKeys";
import { IProduct } from "../utils/models/ProductModel";
  import {  IWorkerModel } from "../utils/models/WorkerModel";

export const useGetKeys = () => {
  return useQuery<IKeys[], Error>({
    queryKey: ['keys'], 
    queryFn: async () => {
      const response = await $api.get<IKeys[]>('/api/keys');
      return response.data; 
    },
    retry: 2, 
    refetchOnWindowFocus: false, 
  });
}

export const useGetUsers = () => {
  return useQuery<IUserModel[], Error>({
    queryKey: ['users'], 
    queryFn: async () => {
      const response = await $api.get<IUserModel[]>('/api/users');
      return response.data; 
    },
    retry: 2, 
    refetchOnWindowFocus: false, 
  });
}

export const useGetProfile = () => {
  return useQuery<IUserModel, Error>({
    queryKey: ['users'], 
    queryFn: async () => {
      const response = await $api.get<IUserModel>(`/api/users/${LocalStorage.get(USER)}`);
      return response.data; 
    },
    retry: 2, 
    refetchOnWindowFocus: false, 
  });
}

export const useGetProducts = () => {
  return useQuery<IProduct[], Error>({
    queryKey: ['products'], 
    queryFn: async () => {
      const response = await $api.get<IProduct[]>(`/api/products`);
      return response.data; 
    },
    retry: 2, 
    refetchOnWindowFocus: false, 
  });
}

export const useGetWorkers = () => {
  return useQuery<IWorkerModel[], Error>({
    queryKey: ['products'], 
    queryFn: async () => {
      const response = await $api.get<IWorkerModel[]>("/api/workers");
      return response.data; 
    },
    retry: 2, 
    refetchOnWindowFocus: false, 
  });
}