var FIBOS = require('fibos.js');

var config = {
  "chainId": "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
  "producer-name": "eosio",
  "public-key": "FO6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
  "private-key": "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3",
  "httpEndpoint": "http://127.0.0.1:8888",
};

var fibos = FIBOS({
  chainId: config["chainId"],
  keyProvider: config["private-key"],
  httpEndpoint: config["httpEndpoint"],
  loggger: {
    log: null,
    error: null
  }
});

var blockChainInfo = fibos.getInfoSync();
console.log('blockChainInfo');
console.log(blockChainInfo);

var blockInfo = fibos.getBlockSync(1);
console.log('blockInfo');
console.log(blockInfo);

var accountInfo = fibos.getAccountSync("eosio");
console.log('accountInfo');
console.log(accountInfo);