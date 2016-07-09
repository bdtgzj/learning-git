/**
 * Controllers - instruction
 */
var Instruction = require('../proxy').Instruction;

var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var InstructionSerializer = require('../serializers').InstructionSerializer;

exports.retrieve = function(req, res, next) {
  if (req.query.device) {
    Instruction.getInstructionByDevice(req.uid, req.query.device, function(err, instructions) {
      if (err) {
        return next(err);
      }
      res.json(InstructionSerializer.serialize(instructions));
    });
  } else if (req.query.scene) {
    Instruction.getInstructionByScene(req.uid, req.query.scene, function(err, instructions) {
      if (err) {
        return next(err);
      }
      res.json(InstructionSerializer.serialize(instructions));
    });
  }
};

exports.exec = function(req, res, next) {
  new JSONAPIDeserializer().deserialize(req.body)
    .then(function(instruction) {
      // get a connection from ConnectionPool. pull
      req.app.locals.connectionPool.allocate(function (err, connection) {
        if (err) {
          return next(err);
        }
        // SN and UID
        var SN = [0x00, 0x00, 0x00, 0x00];
        const UID = [0x00, 0x00, 0x00, 0x00];
        // string to int
        var strInstruction = instruction.instruction.split(' ');
        var intInstruction = [];
        for(var i=0, len=strInstruction.length; i < len; i++) {
          intInstruction.push(parseInt(strInstruction[i]));
        }
        // req.app.locals.ismap.T_SET_COIL0_OPEN
        const buf = new Buffer(SN.concat(UID, intInstruction));
        // send data
        connection.write(buf.toString('binary'), 'binary');
        var cb = (buf) => {
          var data = new Uint8Array(buf).join(' ');
          console.log(data);
          res.json(InstructionSerializer.serialize({instruction: data}));
          connection.removeListener('data', cb);
          //console.log(data);
          // use the inner api of net package, to remove repeated register of data, so can reuse socket.
          // or use connection.end();
          /*
          if (connection._events.hasOwnProperty('data') && connection._events['data'].length > 0) {
            delete connection._events['data'];
            connection._events['data'] = null;
          }
          */
          //connection.end();
        };
        // receive data
        connection.on('data', cb);
      });
    })
    .catch(function(err) {
      return next(err);
    });
};