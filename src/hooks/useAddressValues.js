import { useMemo } from 'react';

const useAddressValues = () => {   

   //https://bookme.lavro.ru/server/images/
   //http://localhost/bookme-server/images/

   const imagesUrl = useMemo(() => (
      'http://localhost/bookme-server/images/'
   ), []);

   //https://bookme.lavro.ru/server/
   //http://localhost/bookme-server/
   
   const serverUrl = useMemo(() => (
      'http://localhost/bookme-server/'
   ), []);

   //https://bookme.lavro.ru/
   //http://localhost:3000/

   const hostUrl = useMemo(() => (
      'http://localhost:3000/'
   ), []);
   
   return {imagesUrl, serverUrl, hostUrl};
}

export default useAddressValues;