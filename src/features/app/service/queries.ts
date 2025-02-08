import {  useQuery } from "@tanstack/react-query";
import $api from '../utils/helpers/axiosInstance';

import { IKeys } from "../components/main-layout/MainLayout";



export const useGetKeys = () => {
  return useQuery<IKeys[], Error>({
    queryKey: ['admin'], 
    queryFn: async () => {
      const response = await $api.get<IKeys[]>('/api/keys');
      return response.data; 
    },
    retry: 2, 
    refetchOnWindowFocus: false, 
  });
}