/**
 * Controllers - Scene
 */
var Scene = require('../proxy').Scene;
var Instruction = require('../proxy').Instruction;

var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var SceneSerializer = require('../serializers').SceneSerializer;

exports.retrieve = function(req, res, next) {
  if (req.query.region) {
    Scene.getSceneByRegion(req.uid, req.query.region, function(err, scenes) {
      if (err) {
        return next(err);
      }
      res.json(SceneSerializer.serialize(scenes));
    });
  }
};

exports.retrieveOne = function(req, res, next) {
  if (req.params.id) {
    Scene.getSceneById(req.uid, req.params.id, function(err, scenes) {
      if (err) {
        return next(err);
      }
      res.json(SceneSerializer.serialize(scenes));
    });
  }
};

exports.exec = function(req, res, next) {
  new JSONAPIDeserializer().deserialize(req.body)
    .then(function(scene) {
      // get a connection from ConnectionPool. pull
      req.app.locals.connectionPool.allocate(function (err, connection) {
        if (err) {
          return next(err);
        }
        instructionLen = 0;
        Instruction.getInstructionByScene(req.uid, scene.id, function(err, instructions) {
          if (err) {
            return next(err);
          }
          instructionLen = instructions.length;
          instructions.forEach(function(instruction) {
            // SN and UID
            var SN = [0x00, 0x00, 0x00, 0x00];
            const UID = [0x00, 0x00, 0x00, 0x00];
            // string to int
            instruction.instruction = instruction.instruction + ' 255 0'; // switch open
            var strInstruction = instruction.instruction.split(' ');
            var intInstruction = [];
            for(var i=0, len=strInstruction.length; i < len; i++) {
              intInstruction.push(parseInt(strInstruction[i]));
            }
            // req.app.locals.ismap.T_SET_COIL0_OPEN
            const buf = new Buffer(SN.concat(UID, intInstruction));
            // send data
            connection.write(buf.toString('binary'), 'binary');
          });
        });
        // receive data
        var retNum = 0;
        var cb = (buf) => {
          var data = new Uint8Array(buf).join(' ');
          console.log(data);
          retNum++;
          if (retNum == instructionLen) {
            res.json(SceneSerializer.serialize(scene));
            connection.removeListener('data', cb);
          }
        };
        connection.on('data', cb);
      });
    })
    .catch(function(err) {
      return next(err);
    });
};