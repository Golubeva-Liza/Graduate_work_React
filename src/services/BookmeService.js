import {useHttp} from '../hooks/http.hook';

const useBookmeService = () => {
   const {request} = useHttp();

   const getAllRespondents = async () => {
      const res = await request("http://localhost/bookme-server/respondents.php");
      return res;
   }

   // const getCharacter = async (id) => {
   //    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
   //    return _transformCharacter(res.data.results[0]);//подставляется в char
   // }

   return {getAllRespondents};
}

export default useBookmeService;