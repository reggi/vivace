
const REGEX = /{(((?!{).)*)}/g;

const keyReducer = function(_, key) {
  const keys = key.split('.');
  return keys.reduce((k, state) => {state[k]}, this);
};

/**
 * Does nested key replacement on strings. Delimiters are single curly brackets. {*}
 *
 * @param template
 * @param data
 * @returns string
 */
module.exports = function(template, data) {
  return template.replace(REGEX, keyReducer.bind(data || {}))
};
