var SN = [0x00, 0x00, 0x00, 0x11];
const UID = [0x00, 0x00, 0x00, 0x00];

exports.open = function(req, res, next) {
  req.app.locals.connectionPool.pull(function (err, connection) {
    if (err) {
      console.log("connection.pull() is error" + err);
      return next(err);
    }
    const buf = new Buffer(SN.concat(UID, req.app.locals.ismap.T_GET_SN));
    connection.write(buf.toString('binary'), 'binary');
    var cb = (data) => {
      res.send(data);
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
    connection.on('data', cb);
  });
};