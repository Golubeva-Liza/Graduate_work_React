import { useCallback, useState } from "react";

export const useHttp = () => {
   const [loading, setLoading] = useState(false);

   const request = useCallback(async (url, method = 'GET', body = null, header = {'Content-Type': 'application/json'}) => {
      setLoading(true);
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

   return {loading, setLoading, request};
}