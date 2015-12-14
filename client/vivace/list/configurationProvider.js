
let config = {
  routePrefix: ''
};

module.exports = {

  set routePrefix(val) {
    config.routePrefix = val;
  },

  get routePrefix() {
    return config.routePrefix;
  },

  $get() {
    return config;
  }
};
