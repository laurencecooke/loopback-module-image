'use strict';

module.exports = function(app) {
  var moduleClass = {
    storagePath: __dirname + '../../storage/',
    getManager: function () {
      return require('./service/manager.js')(app);
    },
    getPath: function () {
      return __dirname;
    }
  };

  return moduleClass;
};
