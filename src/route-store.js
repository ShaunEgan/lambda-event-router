'use strict';

module.exports = () => {
  const routes = [];

  return {
    add: (method, path, handler) => {
      routes.push({
        method: method,
        path: path,
        handler: handler
      })
    },

    find: (method, path) => routes.filter(route => route.path === path && route.method === method)
  };
};