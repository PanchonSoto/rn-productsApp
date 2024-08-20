import { API_URL_ANDROID, API_URL_IOS, API_URL as PROD_URL, STAGE } from "@env";
import axios from "axios";
import { Platform } from "react-native";
import { StorageHelper } from '../helpers/storage-helper';


export const API_URL =
    (STAGE === 'production')
        ? PROD_URL
        : Platform.OS === 'ios'
            ? API_URL_IOS
            : API_URL_ANDROID;

const tesloApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

tesloApi.interceptors.request.use(
    async(config)=> {
        const token = await StorageHelper.getItem('token');
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
)


export {
    tesloApi
}
