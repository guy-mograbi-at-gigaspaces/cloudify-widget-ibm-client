# Cloudify Widget IBM Client

## How to use this project

### System requirements

Make sure the following are available:

- [NodeJS (with NPM)][1]

### Dependencies

Install required dependencies by running `npm install`

### Configuration

The application can be configured either by changing values in
`/home/eliranm/dev/cloudify-widget-ibm-client/backend/appConf.js`, or by adding a private configuration file (will
be ignored in the VCS). By convention, all values in `privateConfiguration` (inside `appConf.js`) that are initialized
with `undefined` are mandatory.

  - `mkdir conf && cd conf && mkdir dev && cd dev && touch meConf.js`





[1]: http://nodejs.org/