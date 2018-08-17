#!/usr/bin/env node

const Web3 = require('web3');

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8555'));

web3.eth.getCoinbase(function(err, data) {
    console.log(data);
});
