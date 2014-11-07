'use strict';

module.exports = function(app) {
  var moduleClass = {
    storagePath: null,
    getPath: function () {
      return __dirname;
    },
    afterBoot: function (appDir) {
      this.storagePath = appDir + '../' + app.dataSources.filesystem.settings.root;
    }
  };

  return moduleClass;
};
