import {Router, Methods} from '../services/router';
import config from '../config';

export const homeRoutes = new Router('/');

homeRoutes
  .add({
    method: Methods.GET,
    uri: '/'
  })
  .bind(() => ({
    apiVersion: config.version,
    time: Date.now()
  }));