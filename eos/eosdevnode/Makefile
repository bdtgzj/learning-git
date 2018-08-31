TAIL?=100
TXID?=0a3a355a93adb0a2b8d8beb05e6fe089d6040a8930249364d749c28480e96080

build-image:
	docker-compose build --no-cache

create-service:
	docker-compose up -d

create-service-node1:
	docker-compose up -d node1

remove-service:
	docker-compose down # add -v to delete volume

start-service:
	docker-compose start

stop-service:
	docker-compose stop

restart-service:
	docker-compose restart

list-container:
	docker ps
	# docker-compose ps

attach-node1:
	docker exec -it eosdevnode_node1_1 /bin/bash

backup-wallet:
	docker cp eosdevnode_node1_1:/root/eosio-wallet/default.wallet ~/Learning/learning-git/eos/eosdevnode/

restore-wallet1:
	docker exec eosdevnode_node1_1 mkdir -p /root/eosio-wallet/
	docker cp ~/Learning/learning-git/eos/eosdevnode/default.wallet eosdevnode_node1_1:/root/eosio-wallet/

run-cleos:
	docker exec -it eosdevnode_node1_1 /opt/eosio/bin/cleos -u http://localhost:8888

alias-cleos:
	alias cleos='docker exec -it eosdevnode_node1_1 /opt/eosio/bin/cleos -u http://localhost:8888'

logs-node1:
	docker-compose logs --tail=$(TAIL) node1

attach-node2:
	docker exec -it eosdevnode_node2_1 /bin/bash

logs-node2:
	docker-compose logs --tail=$(TAIL) node2

restore-wallet2:
	docker exec eosdevnode_node2_1 mkdir -p /root/eosio-wallet/
	docker cp ~/Learning/learning-git/eos/eosdevnode/default.wallet eosdevnode_node2_1:/root/eosio-wallet/

start-service2:
	docker-compose up -d node2

restart-service2:
	docker-compose restart node2

remove-service2:
	docker container stop eosdevnode_node2_1 && docker container rm eosdevnode_node2_1

get-transaction:
	curl -i -X POST \
    -H "Content-Type:application/json" \
    -d \
    '{"id":"$(TXID)"}' \
    'http://127.0.0.1:8889/v1/history/get_transaction'