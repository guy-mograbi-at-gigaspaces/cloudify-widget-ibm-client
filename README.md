# Cloudify Widget IBM Client

## How to use this project

### System requirements

Make sure the following are available:

- [NodeJS (with NPM)][1]

### Dependencies

Install required dependencies by running `npm install` at the project root path.

### Configuration

The application can be configured either by changing values in `backend/appConf.js`, or by adding a private
configuration file (will be ignored in the VCS). By convention, all properties of `privateConfiguration` (inside
`appConf.js`) that are initialized with `undefined` are mandatory.

To use a private configuration file:

  - `mkdir conf; cd conf; mkdir dev; cd dev`
  - `touch meConf.js`
  - Inside `meConf.js`, copy all properties of `privateConfiguration` object from `appConf.js` that are initialized
  with `undefined` into new properties on the `exports` RequireJS object, e.g.:

      exports.authToken = "00000000-aaaa-bbbb-cccc-000000000000";
      exports.userId = "me";
      exports.cookieSecret = "shhhhh";






[1]: http://nodejs.org/