/**
 * Controllers - Scene
 */

//config
const CONFIG = require('../config');
// res
const STRINGS = require('../res/strings');
// validator
var validatorCommon = require('../validators').Common;
var validatorScene = require('../validators').Scene;
// error
var error = require('../libs/error');
// proxy
var Scene = require('../proxy').Scene;
var Instruction = require('../proxy').Instruction;
var Log = require('../proxy').Log;
// json api
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
var SceneSerializer = require('../serializers').SceneSerializer;
// tcp client socket
var net = require('net');
// connections pool
var connections = {};

/*
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
*/

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

  var validatedIdNameRegion = validatorScene.validateIdNameRegion(req.query);
  if (!validatedIdNameRegion.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedIdNameRegion.error));
  }

  Scene.retrieve(validatedUID.data, validatedPage.data, validatedIdNameRegion.data, function(err, scenes) {
    if (err) {
      return next(err);
    }
    res.json(SceneSerializer.serialize(scenes));
  });
};

exports.retrieveOne = function(req, res, next) {
  var validatedID = validatorCommon.validateID(req.params.id);
  if (!validatedID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedID.error));
  }

  var validatedUID = validatorCommon.validateUID(req.query.uid);
  if (!validatedUID.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedUID.error));
  }

  Scene.retrieveOne(validatedUID.data, validatedID.data, function(err, scenes) {
    if (err) {
      return next(err);
    }
    res.json(SceneSerializer.serialize(scenes));
  });
};

/**
 * Create
 */
exports.create = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then((scene) => validatorScene.validateScene(scene))
    .then((validatedScene)=>{
      if (!validatedScene.isValid) {
        return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedScene.error));
      }
      var uid = validatedScene.data.uid;
      delete validatedScene.data.uid;
      Scene.create(uid, validatedScene.data, function(err, scenes) {
        if (err) {
          return next(err);
        }
        res.json(SceneSerializer.serialize(scenes[0]));
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

  var validatedScene = validatorScene.validateScene(req.body.data.attributes);
  if (!validatedScene.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedScene.error));
  }

  var uid = validatedScene.data.uid;
  delete validatedScene.data.uid;
  Scene.updateOne(uid, validatedID.data, validatedScene.data, function(err, scenes) {
    if (err) {
      return next(err);
    }
    res.json(SceneSerializer.serialize(scenes[0]));
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

  var validatedScene = validatorScene.validateScene(req.body.data.attributes);
  if (!validatedScene.isValid) {
    return res.json(error(STRINGS.ERROR_EXCEPTION_DATA, validatedScene.error));
  }

  Scene.deleteOne(validatedScene.data.uid, validatedID.data, function(err, result) {
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
var execLoop = function(fidBuffer, uidBuffer, scene, instructions, socket) {
  // instruction string to int
  var instructionLen = instructions.length;
  instructions.forEach(function(instruction) {
    //var strInstruction = instruction.instruction.split('@')[1].replace(/[\[\]]/g, '');
    var strInstruction = '';
    // scene action
    switch (scene.action) {
      // set off
      case 0:
        strInstruction = instruction.instruction.split('@')[1].replace(/\[.*\]/g, '00 00');
        break;
      // set on
      case 1:
        strInstruction = instruction.instruction.split('@')[1].replace(/\[.*\]/g, 'FF 00');
        break;
      // read state
      case 2:
        strInstruction = instruction.instruction.split('@')[0];
        break;
      default:
        break;
    }
    // string to array
    var arrStrInstruction = strInstruction.split(' ');
    var arrIntInstruction = [];
    for(var i=0, len=arrStrInstruction.length; i < len; i++) {
      arrIntInstruction.push('0x' + arrStrInstruction[i]);
    }
    //
    var instructionBuffer = new Buffer(arrIntInstruction);
    // req.app.locals.ismap.T_SET_COIL0_OPEN
    // const buf = new Buffer(SN.concat(UID, intInstruction));
    const buf = Buffer.concat([fidBuffer, uidBuffer, instructionBuffer]);
    console.log('【Req】', buf);
    // send data
    socket.write(buf.toString('binary'), 'binary');
  }); // end forEach
};

exports.exec = function(req, res, next) {
  new JSONAPIDeserializer(CONFIG.JSONAPI_DESERIALIZER_CONFIG).deserialize(req.body)
    .then(function(scene) {
      Instruction.getInstructionByScene(scene.uid, scene.id, function(err, instructions) {
          if (err) {
            return next(err);
          }
          // FID
          // var FID = [0x00, 0x00, 0x00, 0x00];
          var fid = parseInt(scene.fid);
          var fidBuffer = new Buffer(4);
          fidBuffer.writeUInt32BE(fid);
          // UID
          // const UID = [0x00, 0x00, 0x00, 0x00];
          var uid = parseInt(scene.uid);
          var uidBuffer = new Buffer(4);
          uidBuffer.writeUInt32BE(uid);
          // SID
          // var sid = 'default';
          
          // get connection by fid. one family one connection.
          // prepare tcp client socket
          var socket = null;
          if (connections[fid]) {
            socket = connections[fid];
            // send data
            execLoop(fidBuffer, uidBuffer, scene, instructions, socket);
          } else {
            socket = new net.Socket;
            connections[fid] = socket;
            // configure
            socket.setTimeout(30000);
            // connect, async api
            socket.connect(CONFIG.screenHostPort, CONFIG.screenHostName);
            // on connect
            socket.on('connect', function(conn) {
              // console.log(socket.address());
              execLoop(fidBuffer, uidBuffer, scene, instructions, socket);
            });
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
          var retNum = 0;
          var instructionLen = instructions.length;
          socket.once('data', function(buf) {
            console.log('【Res】', buf);
            // handle error
            if (buf.length > 6) {
              var str = buf.toString();
              var err = str.substr(0, 6);
              if (err === 'ERROR:') {
                // close socket
                socket.end();
                //
                res.json(error(STRINGS.ERROR_EXCEPTION_STATE, str.substr(6)));
                return ;
              }
            }
            retNum++;
            if (retNum == instructionLen) {
              // close socket
              // socket.end();
              // log
              if (scene.action != 2) {
                Log.create(uid, {category: 2, log: scene.regionName + ' > ' + scene.name, ip: req.ip}, function(err) {
                  if (err) {
                    console.log(err);
                  }
                });
              }
              // read status
              var status = -1;
              if (scene.action == 2) {
                switch (instructions[instructionLen-1].categoryName) {
                  case '开关': // 0 or 1
                    // 00 00 00 01 00 01 00 00 00 04 01 01 01 00 after 36 are data, and data = address/number(normal 1byte) + actual data
                    // uid(4) + tcp modbus header(6) + host(1) + function(1) + data
                    var dataHex = [];
                    buf.forEach((v, i) => {
                      var tmp = v.toString(16);
                      if (tmp.length < 2) tmp = '0' + tmp;
                      dataHex.push(tmp);
                    });
                    //
                    var strStatus = '';
                    for(var i = 13, len = dataHex.length; i < len; i++) {
                      strStatus += buf[i];
                    }
                    status = parseInt(strStatus, 16);
                    break;
                  case '正反停': // -1
                    status = -1;
                    break;
                  case '档位': // -2
                    status = -2;
                    break;
                  default:
                    break;
                }
              }
              // response to screen
              console.log({_id: scene.id, action: scene.action, status: status});
              res.json(SceneSerializer.serialize({_id: scene.id, action: scene.action, status: status}));
            }
          });
        }); // end getInstructionByScene
    }) // end then
    .catch(function(err) {
      return next(err);
    });
};