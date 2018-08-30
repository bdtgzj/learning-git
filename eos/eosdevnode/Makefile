TAIL?=100

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
    '{"id":"1244d5afb9088ca91e70ffdb61fd4066386835cf3ff0fb1af9b627425e320bd3"}' \
    'http://127.0.0.1:8889/v1/history/get_transaction'

	https://github.com/EOSIO/eos/issues/3887