#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Web3 = require('web3');

let web3 = new Web3(Web3.givenProvider || 'ws://localhost:8666');
// web3.setProvider(new web3.providers.HttpProvider('http://localhost:8555'));

// get contract bytecode
const contractByteCode = '0x' + fs.readFileSync(path.resolve(process.cwd(), 'bin/SimpleContract.bin'), {encoding: 'utf8'});
// get contract metadata
const contractMetaData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'bin/SimpleContract_meta.json'), {encoding: 'utf8'}));
const contractInterface = contractMetaData.output.abi;

// data
let accountID;
const password = '666666';
const unlockDuraction = 300; // second
let balance;
let transactionHashDeploy;
let contractAddressDeploy;
let transactionHashInteract;
let contractAddressInteract;

//
web3.eth.getCoinbase()
.then(data => {
    accountID = data;
    console.log('CoinBase: ' + accountID);
    return web3.eth.getBalance(accountID);
})
.then(data => {
    balance = data;
    console.log('Balance: ' + balance);
    return web3.eth.personal.unlockAccount(accountID, password, unlockDuraction);
})
.then(data => {
    console.log('UnlockAccount: ' + data);
    // new contract
    let contract = new web3.eth.Contract(contractInterface);
    // deploy contract
    return contract.deploy({data: contractByteCode}).send({from: accountID, gas: 2000000})
    .on('transactionHash', function(data) {
        transactionHashDeploy = data;
        console.log('TransactionHashDeploy: ' + transactionHashDeploy);
    })
    .on('receipt', function(receipt) {
        contractAddressDeploy = receipt.contractAddress;
        console.log('ContractAddressDeploy: ' + contractAddressDeploy); //JSON.stringify(receipt)
    })
    .on('confirmation', function(onfirmationNumber, receipt) {
        console.log('Confirmation: ' + onfirmationNumber);
    });
})
.then(newContract => {
    console.log('NewContractInstance: ' + newContract);
    return newContract.methods.multiply(5).send({from: accountID, gas: 2000000})
    .on('transactionHash', function(data) {
        transactionHashInteract = data;
        console.log('TransactionHashInteract: ' + transactionHashInteract);
    })
    .on('confirmation', function(onfirmationNumber, receipt) {
        console.log('Confirmation: ' + onfirmationNumber);
    });
})
.then(receipt => {
    contractAddressInteract = receipt.contractAddress;
    console.log('ReturnValue: ' + JSON.stringify(receipt.events.Print.returnValues));
    console.log('ReceiptInteraction: ' + JSON.stringify(receipt));
})
.catch(err => console.log(err));

/*
web3.eth.getCoinbase((err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('2' + data);
});
*/
