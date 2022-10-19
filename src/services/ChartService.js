import { useHttp } from '../hooks/http.hooks';


const useChartService = () => {

   const { request, process, setProcess } = useHttp();
   const _apiBase = 'https://run.mocky.io/';

   const getLineChart = async (offset = 0) => {
      const res = await request(`${_apiBase}v3/92a0a266-0321-4ff5-9993-b394d03ceee2`);
      const array = res.map(_transformListLine);
      const size = 12; //размер подмассива
      let newArr = []; //массив в который будет выведен результат.
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
         newArr[i] = array.slice((i * size), (i * size) + size);
      }
      return newArr[offset];
   }

   const getPieChart = async () => {
      const res = await request(`${_apiBase}v3/2699115b-8ced-40c3-8072-b7fa9faf6047`);
      return res.map(_transformListPie);
   }

   const _transformListLine = (item) => {
      return {
         month: item.Месяц,
         percent: item.Процент,
      }
   }

   const _transformListPie = (item) => {
      return {
         name: item.Группа,
         percent: item.Доля
      }
   }

   return { request, process, setProcess, getLineChart, getPieChart }
}

export default useChartService;