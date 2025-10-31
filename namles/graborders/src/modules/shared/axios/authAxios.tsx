
import Axios from 'axios';
// import config from 'src/config';
import { getLanguageCode } from '../../../i18n';
import Qs from 'qs';
import moment from 'moment';
import AuthToken from 'src/modules/auth/authToken';

const authAxios = Axios.create({
  //Local
  // baseURL: "http://localhost:8080/api/",

  //Randthis

  baseURL: "https://nowspeeds.com/api",

  paramsSerializer: function (params) {
    return Qs.stringify(params, {
      arrayFormat: 'brackets',
      filter: (prefix, value) => {
        if (
          moment.isMoment(value) ||
          value instanceof Date
        ) {
          return value.toISOString();
        }

        return value;
      },
    });
  },
});

authAxios.interceptors.request.use(
  async function (options) {
    const token = AuthToken.get();
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    options.headers['ngrok-skip-browser-warning'] = 'true';
    options.headers['Accept-Language'] = getLanguageCode();
    return options;
  },
  function (error) {
    console.log('Request error: ', error);
    return Promise.reject(error);
  },
);

export default authAxios;
