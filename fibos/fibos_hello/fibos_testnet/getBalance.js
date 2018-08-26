var FIBOS = require('./initClient.js');

var config = {
    keyProvider: '5K4ADapxcnjLZ6GFtmnA22q5f5yYbsJzBmbXdWjepsMbchZzYdq', // Private Key, WIF string or array of keys..
}

var fibos = FIBOS(config.keyProvider);
var result = fibos.getTableRowsSync(true, "eosio.token", "testid4fibos", "accounts") // account name
console.log(result);