import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// const fetcher = (url: string) => {
//   console.log('Fetching URL:', url);
//   return axios.get(url)
//     .then((res) => {
//       console.log('Fetched data:', res.data);
//       return res.data;
//     })
//     .catch((error) => {
//       console.error('Axios fetch error:', error);
//       return null;
//     });
// };

// export default fetcher

// const fetcher = async (url: string): Promise<any> => {
//   console.log('Fetching URL:', url);
//   try {
//     const res = await axios.get(url);
//     console.log('Fetched data:', res.data);
//     return res.data;
//   } catch (error) {
//     console.error('Axios fetch error:', error);
//     throw error; // Propagate the error so it can be handled by the caller
//   }
// };

export default fetcher;
