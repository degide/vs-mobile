import axios from 'axios';
import API_URL from '../config/api-url';

export const getAllCandidates = async (token, page=1, perPage=10) => {
    return axios.get(API_URL + `/candidates?page=${page}&perPage=${perPage}`, {
        headers: {
            "Authorization": "Bearer "+token
        }
    })
        .then((res) => {
            return res?.data
        })
        .catch((err) => {
            return err?.response?.data;
        })
}
