import axios from 'axios';
import {API_BASE_URL} from '../../config';
import {getValue} from '../asyncStorage';

export const URIS = {
  LOGIN: 'jwt-auth/v1/token',
  GET_SITES: 'navigator/sites',
  GET_NEWSROOMS: '/wp-json/navigator/newsroom',
  GET_DASHBOARD: 'wp-json/navigator/dashboard',
  GET_WORKSPACE: '/wp-json/navigator/workspace',
  GET_NOTIFICATIONS: '/wp-json/navigator/notifications',
  GET_REPORTS: '/wp-json/navigator/reports',
  GET_INFORMATIONS: '/wp-json/navigator/information',
};

/**
 * BEGIN DEFAULT SETTINGS FOR AXIOS
 *
 */

export const getHeader = async () => {
  const token = await getValue('token');
  return token;
};

export const getHttp = async (baseURL = API_BASE_URL) => {
  let token = await getHeader();
  let http = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return http;
};

/**
 * END DEFAULT SETTINGS FOR AXIOS
 *
 */

export const getSites = async () => {
  let http = await getHttp(API_BASE_URL);
  let res = await http.get(URIS.GET_SITES);
  return res;
};

export const getDashboard = async (baseUrl = API_BASE_URL) => {
  let http = await getHttp(baseUrl);
  let res = await http.get(URIS.GET_DASHBOARD);
  console.log(res);
  return res;
};

export const getWorkspace = async (baseUrl = API_BASE_URL) => {
  let http = await getHttp(baseUrl);
  let res = await http.get(URIS.GET_WORKSPACE);
  return res;
};

export const getNotifications = async (baseUrl = API_BASE_URL, page = 1) => {
  let http = await getHttp(baseUrl);
  let res = await http.get(URIS.GET_NOTIFICATIONS, {
    params: {
      page,
    },
  });
  return res;
};

export const getNewsrooms = async (
  baseUrl = API_BASE_URL,
  page = 1,
  orderBy = 'DESC',
) => {
  let http = await getHttp(baseUrl);
  let res = await http.get(URIS.GET_NEWSROOMS, {
    params: {
      page,
      order: orderBy,
    },
  });
  return res;
};

export const getReports = async (
  baseUrl = API_BASE_URL,
  page = 1,
  search = '',
  orderBy = 'DESC',
) => {
  let http = await getHttp(baseUrl);
  let res = await http.get(URIS.GET_REPORTS, {
    params: {
      page,
      search: search ? search : null,
      order: orderBy,
    },
  });
  console.log(res.data);
  return res;
};

export const getInformations = async (
  baseUrl = API_BASE_URL,
  page = 1,
  category = '',
  search = '',
  orderBy = 'DESC',
) => {
  let http = await getHttp(baseUrl);
  let res = await http.get(URIS.GET_INFORMATIONS, {
    params: {
      page,
      category: category ? category : null,
      search: search ? search : null,
      order: orderBy,
    },
  });
  console.log(res.data);
  return res;
};

export const loginUser = async (payload: any) => {
  let res = await axios.post(API_BASE_URL + URIS.LOGIN, payload);
  return res;
};

export default axios;
