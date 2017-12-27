const fs = require('fs');
const path = require('path');

module.exports.JSFilter = function (file) {
    if (!file || typeof (file) != 'string') return false;
    if (file == 'all.js') return false;
    return file.toLowerCase().endsWith('.js');
};

module.exports.FileOnlyFilter = function (file) {
    if (!file || typeof (file) != 'string') return false;
    switch (file) {
        case '.':
        case '..':
            return false;
    }

    return true;
};

module.exports.Require = function(path, arg) {
    // Setup the endpoints routes
    fs.readdir(path, function(err, files) {
        if(err || !files) {
            return console.log(err);
        }
        console.log(path);
        files.filter(module.exports.JSFilter).map(function(file) {
            require(path + file)(arg);
        });
    });
};