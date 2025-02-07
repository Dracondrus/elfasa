import {  useQuery } from "@tanstack/react-query";
import $api from '../utils/helpers/axiosInstance';
import { UserModel } from '../utils/models/UserModel';

export const useOnCheckUser = () => {
  return useQuery<UserModel | null, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      let token = localStorage.getItem("ELFASA_setup_userToken");
      if (!token) token = ""

      const response = await $api.get(`/api/users/${token}`);
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