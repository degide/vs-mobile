import axios from 'axios';
import API_URL from '../config/api-url';
import * as SecureStorage from 'expo-secure-store'

export const adminRegister = async (data) => {
    return axios.post(API_URL + '/admins', data)
        .then((res) => {
            return res?.data
        })
        .catch((err) => {
            return err?.response?.data;
        })
}

export const voterRegister = async (data) => {
    return axios.post(API_URL + '/voters', data)
        .then((res) => {
            return res?.data
        })
        .catch((err) => {
            return err?.response?.data;
        })
}

export const adminLogin = async (data) => {
    return axios.post(API_URL + '/admins/login', data)
        .then((res) => {
            return res?.data
        })
        .catch((err) => {
            return err?.response?.data;
        }
        )

}

export const voterLogin = async (data) => {
    return axios.post(API_URL + '/voters/login', data)
        .then((res) => {
            return res?.data
        })
        .catch((err) => {
            return err?.response?.data;
        }
        )

}


const getToken = async () => {
    return await SecureStorage.getItemAsync('token');
}