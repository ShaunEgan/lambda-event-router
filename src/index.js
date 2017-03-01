'use strict';

const routes = require('./route-store')();

module.exports.router = () => ({
  get: (path, handler) => routes.add('GET', path, handler),
  post: (path, handler) => routes.add('POST', path, handler),
  patch: (path, handler) => routes.add('PATCH', path, handler),
  put: (path, handler) => routes.add('PUT', path, handler),
  delete: (path, handler) => routes.add('DELETE', path, handler),
  head: (path, handler) => routes.add('HEAD', path, handler),
  trace: (path, handler) => routes.add('TRACE', path, handler),
  options: (path, handler) => routes.add('OPTIONS', path, handler),

  route: (event, context) => {
    const resource = event.resource;
    const httpMethod = event.httpMethod;

    const resolved = routes.find(httpMethod, resource);

    if (resolved.length > 0) {
      resolved[0].handler(event, context);
    } else {
      context.fail({ error: 'Unroutable request', path: resource, method: httpMethod });
    }
  }
});