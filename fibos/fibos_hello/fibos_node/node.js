var fibos = require('fibos');

fibos.load("http", {
  "http-server-address": "0.0.0.0:8888" // default 127.0.0.1:8888
});
fibos.load("chain", {
  "delete-all-blocks": true
});
fibos.load("net", {
  "p2p-listen-endpoint": "0.0.0.0:9876" // default 0.0.0.0:9876
});
fibos.load("chain_api");
fibos.load("history_api");
fibos.load("producer", {
  'producer-name': 'eosio',
  'enable-stale-production': true
});

// default dir on Mac: ~/Library/Application Support/eosio/nodeos
// fibos.config_dir = "fibos_config_dir/";
// fibos.data_dir = "fibos_data_dir/";

fibos.start();