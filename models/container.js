'use strict';

module.exports = function(Container) {
  Container.afterRemote('upload', function(ctx, inst, next) {
    var models = Container.app.models;

    var modelName = ctx.result.result.fields.componentId[0];
    var functionName = ctx.result.result.fields.componentClass[0];
    var targetId = ctx.result.result.fields.targetId[0];
    var fileData = ctx.result.result.files.file[0];

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
