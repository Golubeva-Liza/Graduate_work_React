import {useHttp} from '../hooks/http.hook';

const useBookmeService = () => {
   const {request} = useHttp();

   const getAllRespondents = async () => {
      const res = await request("http://localhost/bookme-server/respondents.php");
      const data = await res.json();
      return data;
   }

   const addRespondent = async (form) => {
      const res = await request("http://localhost/bookme-server/add-responds.php", 'POST', form);
      const data = await res.json();
      return data;
   }

   const removeRespondent = async (respond) => {
      const res = await request("http://localhost/bookme-server/remove-respond.php", 'POST', respond);
      const data = await res.text();
      return data;
   }

   const editRespondent = async (form) => {
      const res = await request("http://localhost/bookme-server/edit-respond.php", 'POST', form);
      const data = await res.json();
      return data;
   }

   return {getAllRespondents, addRespondent, removeRespondent, editRespondent};
}

export default useBookmeService;