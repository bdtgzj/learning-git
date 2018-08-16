SF=SimpleContract.sol

#attach-solc:
#	docker run -it --rm ethereum/solc:stable /bin/sh -l

solc-help:
	docker run -it --rm ethereum/solc:stable solc --help

solc-run:
	docker run -it --rm -v $(PWD):/root/ ethereum/solc:stable --overwrite --gas --bin --metadata -o /root/bin /root/src/$(SF)