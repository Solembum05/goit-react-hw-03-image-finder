import axios from "axios";
const URL = 'https://pixabay.com/api/';
const API_KEY = '36678535-61ed1cb4f19d38d69cf379d72';


export const quntityPage = 12;
const options = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: quntityPage,
}).toString();

export const fetchImg = async (dataSubmit, page) => {
  const responce = await axios.get(
    `${URL}?key=${API_KEY}&q=${dataSubmit}&page=${page}&${options}`
  );
  return responce.data;
};

