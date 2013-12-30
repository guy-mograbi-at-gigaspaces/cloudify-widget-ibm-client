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
  - `echo -e "var private Configuration = {\n};" | tee meConf.js`
  - Copy all properties of `privateConfiguration` object in `appConf.js` that are initialized with `undefined` into the
    `privateConfiguration` object in `meConf.js`.





[1]: http://nodejs.org/