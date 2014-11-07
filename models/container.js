'use strict';

var fs      = require('fs');
var shortId = require('shortid');

module.exports = function(Container) {
  Container.beforeRemote('upload', function(ctx, inst, next) {
    var app         = Container.app;
    var containerId = ctx.args.req.params.container;

    var containerPath = app.module['loopback-module-image'].storagePath + '/' + containerId;

    if (! fs.existsSync(containerPath)) {
      if (! fs.mkdirSync(containerPath, '0755')) {
        console.log('Can not create dir: ' + containerPath);
      }
    };

    next();
  });

  Container.afterRemote('upload', function(ctx, inst, next) {
    var app    = Container.app;
    var models = Container.app.models;

    var modelName = ctx.result.result.fields.componentId[0];
    var functionName = ctx.result.result.fields.componentClass[0];
    var targetId = ctx.result.result.fields.targetId[0];
    var fileData = ctx.result.result.files.file[0];

    var newFileName = shortId.generate() + '.' + fileData.name.split('.').pop();

    fs.renameSync(
      app.module['loopback-module-image'].storagePath + '/' + fileData.container + '/' + fileData.name,
      app.module['loopback-module-image'].storagePath + '/' + fileData.container + '/' + newFileName
    );

    fileData.name = newFileName;

    models.file.create(fileData, function(err, data) {
      models[modelName][functionName](targetId, data)
       .then(function (data) {
        ctx.result.result.model = data;
        next();
       })
       .catch(function(err) {
        next(err);
       });
    });
  });
};
