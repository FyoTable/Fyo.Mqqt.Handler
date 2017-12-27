var helpers = require('../../utils/helpers.js');

module.exports = function(app) {
    helpers.Require(__dirname + '/devices/', app);
}