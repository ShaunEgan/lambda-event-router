'use strict';

const RouteStore = require('route-store');

describe('route-store', () => {

  beforeEach(() => {
    this.routeStore = RouteStore();
  });

  it('instantiates', () => {
    expect(typeof this.routeStore).toEqual('object');
  });

  it('adds a route', () => {
    const invoker = () => this.routeStore.add('GET', '/', () => {});

    expect(invoker).not.toThrow();
  });

  it('correctly finds a route for a given path', () => {
    const expected = { method: 'GET', path: '/', handler: () => {} };

    this.routeStore.add(expected.method, expected.path, expected.handler);
    this.routeStore.add('POST', '/', () => {});
    this.routeStore.add('GET', '/abc', () => {});

    expect(this.routeStore.find('GET', '/')[0]).toEqual(expected)
  });
});