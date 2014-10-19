module.exports = function(app) {
  var moduleClass = {
    storagePath: __dirname + '../../storage/',
    getManager: function () {
      return require('./service/manager.js')(app);
    }
  };

  return moduleClass;
};
