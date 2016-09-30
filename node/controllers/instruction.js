/**
 * Controllers - instruction
 */
// config
const CONFIG = require('../config');
// res
const STRINGS = require('../res/strings');
// validator
var validatorCommon = require('../validators').Common;
var validatorInstruction = require('../validators').Instruction;
// error
var error = require('../libs/error');
// proxy
var Instruction = require('../proxy').Instruction;
var Log = require('../proxy').Log;
// json api
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var InstructionSerializer = require('../serializers').InstructionSerializer;
// tcp client socket
var net = require('net');
// connections pool
var connections = {};
/**
 * Retrieve
 */
exports.retrieve = function(req, res, next) {
  var validatedUID = validatorCommon.validateUID(req.query.uid);
  if (!validatedUID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedUID.error));
  }

  var validatedPage = validatorCommon.validatePage(req.query.page);
  if (!validatedPage.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedPage.error));
  }
  // page.limit must positive for aggregate
  if (!validatedPage.data.limit) validatedPage.data.limit = CONFIG.MONGOOSE.AGGREGATE_QUERY_LIMIT;

  var validatedIdNameDeviceScene = validatorInstruction.validateIdNameDeviceScene(req.query);
  if (!validatedIdNameDeviceScene.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedIdNameDeviceScene.error));
  }

  Instruction.retrieve(validatedUID.data, validatedPage.data, validatedIdNameDeviceScene.data, function(err, instructions) {
    if (err) {
      return next(err);
    }
    res.json(InstructionSerializer.serialize(instructions));
  });
};

/*
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
*/

/**
 * Create
 */
exports.create = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then((instruction) => validatorInstruction.validateInstruction(instruction))
    .then((validatedInstruction)=>{
      if (!validatedInstruction.isValid) {
        return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedInstruction.error));
      }
      var uid = validatedInstruction.data.uid;
      delete validatedInstruction.data.uid;
      Instruction.create(uid, validatedInstruction.data, function(err, instructions) {
        if (err) {
          return next(err);
        }
        res.json(InstructionSerializer.serialize(instructions[0]));
      });
    })
    .catch((err)=>{
      return next(err);
    });
};

/**
 * Update
 */
exports.updateOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error));
  }

  var validatedInstruction = validatorInstruction.validateInstruction(req.body.data.attributes);
  if (!validatedInstruction.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedInstruction.error));
  }

  var uid = validatedInstruction.data.uid;
  delete validatedInstruction.data.uid;
  Instruction.updateOne(uid, validatedID.data, validatedInstruction.data, function(err, instructions) {
    if (err) {
      return next(err);
    }
    res.json(InstructionSerializer.serialize(instructions[0]));
  });
};

/**
 * Delete
 */
exports.deleteOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error));
  }

  var validatedInstruction = validatorInstruction.validateInstruction(req.body.data.attributes);
  if (!validatedInstruction.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedInstruction.error));
  }

  Instruction.deleteOne(validatedInstruction.data.uid, validatedID.data, function(err, result) {
    if (err) {
      return next(err);
    }
    res.type('text/plain').end();
    // res.json();
  });
};

/**
 * command execute
 */
exports.exec = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then(function(instruction) {
      // FID
      // var FID = [0x00, 0x00, 0x00, 0x00];
      var fid = parseInt(instruction.fid);
      var fidBuffer = new Buffer(4);
      fidBuffer.writeUInt32BE(fid);
      // UID
      // const UID = [0x00, 0x00, 0x00, 0x00];
      var uid = parseInt(instruction.uid);
      var uidBuffer = new Buffer(4);
      uidBuffer.writeUInt32BE(uid);
      // SID
      // var sid = 'default';
      // prepare for instruction data
      // instruction string to int
      var strInstruction = instruction.instruction.split(' ');
      var intInstruction = [];
      for(var i=0, len=strInstruction.length; i < len; i++) {
        intInstruction.push('0x' + strInstruction[i]);
      }
      var instructionBuffer = new Buffer(intInstruction);
      // req.app.locals.ismap.T_SET_COIL0_OPEN
      const bufSend = Buffer.concat([fidBuffer, uidBuffer, instructionBuffer]);
      
      // get connection by fid. one family one connection.
      // prepare tcp client socket
      var socket = null;
      if (connections[fid]) {
        socket = connections[fid];
        // send data
        socket.write(bufSend.toString('binary'), 'binary');
        console.log('【Req】', bufSend);
      } else {
        socket = new net.Socket;
        connections[fid] = socket;
        // configure
        socket.setTimeout(30000);
        // connect, async api
        socket.connect(CONFIG.screenHostPort, CONFIG.screenHostName);
        // on connect
        socket.on('connect', function(conn) {
          // can look every socket
          console.log(socket.address());
          // send data
          socket.write(bufSend.toString('binary'), 'binary');
          console.log('【Req】', bufSend);
        }); // end socket.on
        // on error
        socket.on('error', function(err) {
          //var handlerData = handlerDatas.pop();
          //if (typeof handlerData  === 'function') handlerData(err);
          console.log(err);
          delete connections[fid];
          socket.destroy();
        });
        // on timeout
        socket.on('timeout', function() {
          console.log('timeout');
          delete connections[fid];
          // Half-closes the socket.sends a FIN packet.server will still send some data.
          socket.end();
          socket.destroy();
        });
        // received a FIN packet from server.
        socket.on('end', function() {
          console.log('end');
          delete connections[fid];
          // Half-closes the socket.sends a FIN packet.server will still send some data.
          socket.end();
          socket.destroy();
        });
      }
      // on received data
      // note: concurrent request result in multiple register, and one time execute.
      socket.once('data', function(buf) {
        // console.log(buf);
        // handle error
        if (buf.length >= 10) {
          var str = buf.toString();
          var err = buf.slice(4, 10).toString();
          if (err === 'ERROR:') {
            res.json(error(STRINGS.ERROR_EXCEPTION_STATE, buf.slice(10).toString()));
            return ;
          }
        }

        if (true) {
          // close socket
          // socket.end();
          // log
          if (instruction.log) {
            Log.create(uid, {category: 2, log: instruction.log, ip: req.ip}, function(err) {
              if (err) {
                console.log(err);
              }
            });
          }
          // response to screen
          // var data = new Uint8Array(buf).join(' ');
          var data = [];
          buf.forEach((v, i) => {
            var tmp = v.toString(16);
            if (tmp.length < 2) tmp = '0' + tmp;
            data.push(tmp);
          });
          console.log('【Res】', data.join(' '));
          res.json(InstructionSerializer.serialize({instruction: data.join(' ')}));
        }
      });
    }) // end then
    .catch(function(err) {
      return next(err);
    });
};