'use strict';

module.exports = function(app) {
  var moduleClass = {
    storagePath: null,
    getPath: function () {
      return __dirname;
    },
    afterBoot: function (appDir) {
      this.storagePath = app.dataSources.filesystem.settings.root.charAt(0) === "/" ? app.dataSources.filesystem.settings.root : appDir + '../' + app.dataSources.filesystem.settings.root;
    }
  };

  return moduleClass;
};
