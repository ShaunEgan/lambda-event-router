# Lambda Event Router

A super lightweight router for use inside of lambda functions. This is useful
inside of lambda functions which handle multiple request types and paths.

Does not require the use of other libraries and does not transform the `event`
and `context` objects in any way.

## Installation

```bash
npm install --save lambda-event-router
```

## Example

```bash
const router = require('lambda-event-router').router();

router.get('/greeting', (event, context) => {
  context.succeed({
    statusCode: 200,
    body: JSON.stringify({ message: "Hello world" })
  });
});

module.exports.handler = router.route;
```

## Supported methods

Currently supported HTTP methods include:

* get
* post
* patch
* put
* delete
* head
* trace
* options
