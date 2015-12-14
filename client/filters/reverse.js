
module.exports = function() {
  return function(value) {
    return value.split('').reverse().join('');
  };
};
