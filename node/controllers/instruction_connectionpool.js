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
      // get a connection from ConnectionPool. pull
      // async api
      req.app.locals.connectionPool.allocate(function (err, connection) {
        if (err) {
          return next(err);
        }
        //
        // console.log(connection.address());
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
        // instruction string to int
        var strInstruction = instruction.instruction.split(' ');
        var intInstruction = [];
        for(var i=0, len=strInstruction.length; i < len; i++) {
          intInstruction.push('0x' + strInstruction[i]);
        }
        var instructionBuffer = new Buffer(intInstruction);
        // req.app.locals.ismap.T_SET_COIL0_OPEN
        const buf = Buffer.concat([fidBuffer, uidBuffer, instructionBuffer]);
        console.log('【Req】', buf);
        // send data
        connection.write(buf.toString('binary'), 'binary');
        // log
        if (instruction.log) {
          Log.create(uid, {category: 2, log: instruction.log, ip: req.ip}, function(err) {
            if (err) {
              console.log(err);
            }
          });
        }
        // pass http's res object for response to screen client.
        connection.emit('handlerData', fid, function(ex, buf) {
          // handle error
          if (ex) {
            return next(ex);
          }
          // handle error
          if (buf.length >= 10) {
            var str = buf.toString();
            var err = buf.slice(4, 10).toString();
            if (err === 'ERROR:') {
              res.json(error(STRINGS.ERROR_EXCEPTION_STATE, buf.slice(10).toString()));
              return ;
            }
          }
          // var data = new Uint8Array(buf).join(' ');
          var data = [];
          buf.forEach((v, i) => {
            var tmp = v.toString(16);
            if (tmp.length < 2) tmp = '0' + tmp;
            data.push(tmp);
          });
          console.log('【Res】', data.join(' '));
          res.json(InstructionSerializer.serialize({instruction: data.join(' ')}));
        }); // end emit
      }); // end allocate
    }) // end then
    .catch(function(err) {
      return next(err);
    });
};