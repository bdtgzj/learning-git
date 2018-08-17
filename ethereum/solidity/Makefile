SF=SimpleContract.sol
AccountID=0x80d270d342ef005e9dce833e83644ffb65b10e87
AccountPassphrase=666666
ContractBytecode=0x608060405234801561001057600080fd5b5060f58061001f6000396000f300608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b348015604f57600080fd5b50606c600480360381019080803590602001909291905050506082565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582046fe7f7b1b572f497bceacf5eceb439a538d512606d1ba129773f564fba9aa040029
TransactionHash=0x7ab7e82f5e9846724441aef4d449ac6334dc455c34220293eb670551824809c5
ContractAddress=0xf3b5be57c121ff0e96c34642e40bba951ec879c7
FunctionNameArgument=0xc6888fa10000000000000000000000000000000000000000000000000000000000000006

#attach-solc:
#	docker run -it --rm ethereum/solc:stable /bin/sh -l

solc-help:
	docker run -it --rm ethereum/solc:stable solc --help

# solc-run
compile:
	docker run -it --rm -v $(PWD):/root/ ethereum/solc:stable --overwrite --gas --bin --metadata -o /root/bin /root/src/$(SF)

eth.coinbase:
	curl -ivL -H "Content-Type: application/json" -X POST -d '{"jsonrpc":"2.0","method":"eth_coinbase", "id":1}' http://localhost:8555\

eth.getBalance:
	curl -ivL -H "Content-Type: application/json" -X POST -d '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["$(AccountID)", "latest"], "id":2}' http://localhost:8555

eth.estimateGas:
	curl -ivL -H "Content-Type: application/json" -X POST -d '{"jsonrpc":"2.0","method":"eth_estimateGas", "params": [{"from": "$(AccountID)", "data": "$(ContractBytecode)"}], "id":3}' http://localhost:8555

personal.unlockAccount:
	curl -ivL -H "Content-Type: application/json" -X POST -d '{"jsonrpc":"2.0","method":"personal_unlockAccount", "params":["$(AccountID)", "$(AccountPassphrase)", 300], "id":4}' http://localhost:8555

# Deploy contract on blockchain.
DeployContract:
	curl -ivL -H "Content-Type: application/json" -X POST -d '{"jsonrpc":"2.0","method":"eth_sendTransaction", "params": [{"from": "$(AccountID)", "data": "$(ContractBytecode)", "gas": "0x1ce23"}], "id":5}' http://localhost:8555
# TransactionHash: 0x7ab7e82f5e9846724441aef4d449ac6334dc455c34220293eb670551824809c5

txpool.content:
	curl -ivL -H "Content-Type: application/json" -X POST -d '{"jsonrpc":"2.0","method":"txpool_content", "id":6}' http://localhost:8555

miner.start:
	curl -ivL -H "Content-Type: application/json" -X POST -d '{"jsonrpc":"2.0","method":"miner_start", "params": [1], "id":7}' http://localhost:8555

miner.stop:
	curl -ivL -H "Content-Type: application/json" -X POST -d '{"jsonrpc":"2.0","method":"miner_stop", "params": [], "id":8}' http://localhost:8555

eth.getTransactionByHash:
	curl -ivL -H "Content-Type: application/json" -X POST -d '{"jsonrpc":"2.0","method":"eth_getTransactionByHash", "params": ["$(TransactionHash)"], "id":9}' http://localhost:8555
# input: Contract Bytecode

eth.getTransactionReceipt:
	curl -ivL -H "Content-Type: application/json" -X POST -d '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt", "params": ["$(TransactionHash)"], "id":10}' http://localhost:8555
# "contractAddress":"0xf3b5be57c121ff0e96c34642e40bba951ec879c7"

# FunctionName: web3.sha3("multiply(uint256)").substring(0, 10) // "0xc6888fa1"
# FunctionArgument: 0000000000000000000000000000000000000000000000000000000000000006
# Data (FunctionNameArgument): 0xc6888fa10000000000000000000000000000000000000000000000000000000000000006
eth.sendTransaction:
	curl -ivL -H "Content-Type: application/json" -X POST -d '{"jsonrpc":"2.0","method":"eth_sendTransaction", "params": [{"from": "$(AccountID)", "to": "$(ContractAddress)", "data": "$(FunctionNameArgument)"}], "id":11}' http://localhost:8555
# TransactionHash: 0x268527498520a57369c2cdaf82bfb34e51aad0fb844be8bf2017371dc2d9ec44
