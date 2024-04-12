const requireDir = require('require-dir');
const models = requireDir();

console.log(models);

module.exports = models;
