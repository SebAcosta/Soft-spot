import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { REACT_APP_API_URL } from '@env';
const REACT_APP_API_URL = "http://192.168.0.13:3000"
export const GET = 'GET';
export const BASEPATH = '/user';
const LOGINPATH = `${REACT_APP_API_URL}/user/login`;
const SIGNINPATH = `${REACT_APP_API_URL}/user/signin`;

export const token = async () => await AsyncStorage.getItem('token');
//console.log(process.env.REACT_APP_API_URL)
const API = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: { 
    "Access-Control-Allow-Origin": null ,
    "Accept":"*/*"
  },
});

export async function login (email, password) {
    return await API.post(LOGINPATH, { email, password });
};
export async function signin (email, password, nombre) {
    return await API.post(SIGNINPATH, { email, password, nombre });
};


/**
 * Generic function to make api calls
 * @param {ENUM} operation - Consts FIND, GET, SAVE or UPDATE
 * @param {string} model - Model name in API
 * @param {object} payload - Data to send
 * @param {object} params - Object that can contain id of model or queries and skip for find calls.
 */
export async function process(operation, model, payload = {}, params = {}) {
    const { id, queries, limit, skip } = params || {};
  
    const oAuth = {
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    };

    switch (operation) {
        case FIND:
            return await API.get(`${BASEPATH}/${model}`, oAuth);
        default:
            return null;
    }
};