#!/usr/bin/env node

const Web3 = require('web3');

let web3 = new Web3(Web3.givenProvider || 'ws://localhost:8555');

let coinbase = web3.eth.coinbase;
console.log(coinbase);

web3.eth.getCoinbase(function(err, data) {
    console.log(data);
});

