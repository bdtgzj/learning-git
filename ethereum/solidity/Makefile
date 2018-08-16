SF=SimpleContract.sol

#attach-solc:
#	docker run -it --rm ethereum/solc:stable /bin/sh -l

solc-help:
	docker run -it --rm ethereum/solc:stable solc --help

solc-run:
	docker run -it --rm -v $(PWD):/root/ ethereum/solc:stable --overwrite --gas --bin --metadata -o /root/bin /root/src/$(SF)

eth.coinbase:
	curl -ivL -H "Content-Type: application/json" -X POST -d '{"jsonrpc":"2.0","method":"eth_coinbase", "id":1}' http://localhost:8555\

eth.getBalance:
	curl -ivL -H "Content-Type: application/json" -X POST -d '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x5e8df2d40f365b69b98d57eb6154455bcd4e26b1", "latest"], "id":2}' http://localhost:8555