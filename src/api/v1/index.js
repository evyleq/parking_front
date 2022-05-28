import axios from 'axios';

var conf = {
  api_url: 'http://iot.tyuiu.ru/parking_back/v1',
  //api_url: 'http://localhost:5000/api/v1'
  //api_url: process.env.REACT_APP_ENV === "prod" ? process.env.REACT_APP_API_URL : process.env.REACT_APP_TEST_API_URL
};

export function Conf() {
  return conf;
}

export function initialize(config) {
  Object.assign(conf, config);
}

export function getUserFromLocalStorage() {
  return {
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    email: localStorage.getItem('email'),
  };
}

export function setUserToLocalStorage(token, userId, email) {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('email', email);
}

export function logout() {
  localStorage.clear();
}

export function token() {
  return localStorage.getItem('token');
}

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    // Adding api url prefix.
    if (config.url.substring(0, 4) !== 'http') {
      config.url = Conf().api_url + config.url;
      config.headers = {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response.data.obj || response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
// --- CRUD section
export async function crud_create(type, data) {
  return axios.post('/' + type, data);
}

export async function crud_read_all(type, query) {
  return axios.get('/' + type + (query ? '?' + query : ''));
}

export async function crud_read_one(type, id) {
  return axios.get('/' + type + '/' + id);
}

export async function crud_update(type, id, data) {
  return axios.put('/' + type + '/' + id, data);
}

export async function crud_delete(type, id) {
  return axios.delete('/' + type + '/' + id);
}

/***
 * Auth
 */

export function login(data) {
  var headers = { Authorization: 'Bearer ' + token() };
  return axios.post('/login', data, { headers: headers });
}

export function signup(data) {
  var headers = { Authorization: 'Bearer ' + token() };
  return axios.post('/signup', data, { headers: headers });
}

/***
 * Parkings
 */

export function addParking(data) {
  var headers = { Authorization: 'Bearer ' + token() };
  return axios.post('/parkings', data, { headers: headers });
}

export function updateParking(id, data) {
  var headers = { Authorization: 'Bearer ' + token() };
  return axios.put('/parkings/' + id, data, { headers: headers });
}

export function getParkingById(id) {
  var headers = { Authorization: 'Bearer ' + token() };
  return axios.get('/parkings/' + id, { headers: headers });
}

export function getParkings() {
  var headers = { Authorization: 'Bearer ' + token() };
  return axios.get('/parkings', { headers: headers });
}

export function deleteParking(id) {
  var headers = { Authorization: 'Bearer ' + token() };
  return axios.delete('/parkings/' + id, { headers: headers });
}

/***
 * Maps
 */

export function getAddress(coords) {
  return axios.get(
    'http://geocode-maps.yandex.ru/1.x/?geocode=' +
      coords +
      '&format=json&apikey=0550ff9d-e1a4-4e15-a82f-8dc35662d3d1',
  );
}

/**
 * Logs
 */

export function getLogs(params) {
  var headers = { Authorization: 'Bearer ' + token() };
  return axios.get('/logs', { headers: headers, params });
}
