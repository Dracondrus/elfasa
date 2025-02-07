import {  useQuery } from "@tanstack/react-query";
import $api from '../utils/helpers/axiosInstance';
import { UserModel } from '../utils/models/UserModel';



export const useGetUsers = () => {
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