'use strict';

/**
 * session configs
 */
export default {
  name: 'blueCMF',
  type: 'file',
  secret: 'WY9SQ*GV',
  timeout: 24 * 3600,
  cookie: { // cookie options
    length: 32,
    httponly: true
  },
  adapter: {
    file: {
      path: think.RUNTIME_PATH + '/session',
    }
  }
};