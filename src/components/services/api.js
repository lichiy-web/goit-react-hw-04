import axios from "axios";

const AUYH_KEY = 'Client-ID VwhS9NBNnHuZM281B7WGNdkrt3Le0WxWq_O7OJ0tsMY';

axios.defaults.baseURL = 'https://api.unsplash.com';
axios.defaults.headers.common['Authorization'] = AUYH_KEY;
axios.defaults.headers.common['Accept-Version'] = 'v1';

export const findImages = async (query, page, perPage) => {
    return axios.get(`/search/photos?page=${page}&per_page=${perPage}&query=${query}`);
}