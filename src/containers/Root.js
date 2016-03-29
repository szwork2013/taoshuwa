if (__DEV__) {
  module.exports = require('./Root.prod');
} else {
  module.exports = require('./Root.dev');
}
