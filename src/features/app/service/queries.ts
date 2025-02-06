import {  useQuery } from "@tanstack/react-query";
import $api from '../utils/helpers/axiosInstance';
import { UserModel } from '../utils/models/UserModel';

export const useOnCheckUser = () => {
  return useQuery<UserModel[], Error>({
    queryKey: ['users'], 
    queryFn: async () => {
      const response = await $api.get('/api/users');
      return response.data; 
    },
    retry: 2, 
    refetchOnWindowFocus: false,
  });
};

export const useOnCheckAdmin = () => {
  return useQuery<UserModel, Error>({
    queryKey: ['admin'], 
    queryFn: async () => {
      const response = await $api.get('/api/users');
      return response.data; 
    },
    retry: 2, 
    refetchOnWindowFocus: false, 
  });
}