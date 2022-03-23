import { useCallback } from "react";

export const useHttp = () => {

   const request = useCallback(async (url, method = 'GET', body = null, header = {'Content-Type': 'application/json'}) => {
      try{
         const response = await fetch(url, {method, header, body});
   
         if (!response.ok) {
            throw new Error(`Could not fetch this, status: ${response.status}`);
         }
   
         return response;

      } catch (e){
         throw e;
      }
   }, []);

   return {request};
}