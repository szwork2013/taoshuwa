console.log('__DEV__STORE:',__DEV__);
console.log('NODE_ENV:',process.env.NODE_ENV);

if (__DEV__) {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}
