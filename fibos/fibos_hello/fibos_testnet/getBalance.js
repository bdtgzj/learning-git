var FIBOS = require('fibos.js');

var config = {
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f', // 32 byte (64 char) hex string
    keyProvider: '5K4ADapxcnjLZ6GFtmnA22q5f5yYbsJzBmbXdWjepsMbchZzYdq', // Private Key, WIF string or array of keys..
    httpEndpoint: 'http://103.80.170.107:8888',
    logger: {
        log: null,
        error: null
    }
}

var fibos = FIBOS(config);
var result = fibos.getTableRowsSync(true, "eosio.token", "testid4fibos", "accounts") // account name
console.log(result);