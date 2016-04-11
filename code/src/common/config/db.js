'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '',
      database: 'bluethink',
      user: 'root',
      password: '123456',
      prefix: 'bt_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};