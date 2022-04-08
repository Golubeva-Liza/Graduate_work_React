import {useHttp} from '../hooks/http.hook';

const useBookmeService = () => {
   const {loading, setLoading, request} = useHttp();

   const getAllRespondents = async () => {
      const res = await request("http://localhost/bookme-server/respondents.php");
      // console.log(loading);
      const data = await res.json();
      // setLoading(false);
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

   const login = async (form) => {
      const res = await request("http://localhost/bookme-server/login.php", 'POST', form);
      const data = await res.text();
      return data;
   }

   const registration = async (form) => {
      const res = await request("http://localhost/bookme-server/signup.php", 'POST', form);
      const data = await res.text();
      return data;
   }

   const getLoggedUser = async (userId) => {
      const res = await request("http://localhost/bookme-server/get-user.php", 'POST', userId);
      const data = await res.json();
      return data;
   }

   const updateUserData = async (form) => {
      const res = await request("http://localhost/bookme-server/update-user.php", 'POST', form);
      const data = await res.text();
      return data;
   }

   return {loading, setLoading, getAllRespondents, addRespondent, removeRespondent, editRespondent, login, registration, getLoggedUser, updateUserData};
}

export default useBookmeService;