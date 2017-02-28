'use strict';

const RouteStore = () => {
  const routes = [];

  return {
    add: (path, method, handler) => {
      routes.push({
        path: path,
        method: method,
        handler: handler
      })
    },

    find: (path, method) => routes.filter(route => route.path === path && route.method === method)
  };
};

module.exports.router = () => {
  const routes = RouteStore();
  const addRoute = (method, path, handler) => { routes.add(path, method, handler) };

  return {
    get: (path, handler) => addRoute('GET', path, handler),
    post: (path, handler) => addRoute('POST', path, handler),
    patch: (path, handler) => addRoute('PATCH', path, handler),
    put: (path, handler) => addRoute('PUT', path, handler),
    delete: (path, handler) => addRoute('DELETE', path, handler),
    head: (path, handler) => addRoute('HEAD', path, handler),
    trace: (path, handler) => addRoute('TRACE', path, handler),
    options: (path, handler) => addRoute('OPTIONS', path, handler),

    route: (event, context) => {
      const resource = event.resource;
      const httpMethod = event.httpMethod;

      const resolved = routes.find(resource, httpMethod);

      if (resolved.length > 0) {
        resolved[0].handler(event, context);
      } else {
        context.fail({ error: 'Unroutable request', path: resource, method: httpMethod });
      }
    }
  }
};