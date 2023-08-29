import axios from 'axios';

const fetcher = (url: string) =>
 axios.get(url)
.then((res) => res.data)
.catch((error) => {
    console.error('An error occurred while fetching data:', error);
    throw error; 
  });;

export default fetcher;