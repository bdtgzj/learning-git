TAIL ?= 100

build-image:
	docker-compose build --no-cache

create-service:
	docker-compose up -d

remove-service:
	docker-compose down # add -v to delete volume

start-service:
	docker-compose start

stop-service:
	docker-compose stop

list-container:
	docker ps
	# docker-compose ps

attach-node1:
	docker exec -it ethereumprivate_node1_1 /bin/sh -l

attach-console1:
	docker exec -it ethereumprivate_node1_1 geth attach

attach-console1e:
	docker exec -it ethereumprivate_node1_1 geth attach --jspath "/root/.ethereum" --preload "utils.js"

logs-node1:
	docker-compose logs --tail=$(TAIL) node1

attach-node2:
	docker exec -it ethereumprivate_node2_1 /bin/sh -l

attach-console2:
	docker exec -it ethereumprivate_node2_1 geth attach

# attach-console2-with-custom-js:
attach-console2e:
	docker exec -it ethereumprivate_node2_1 geth attach --jspath "/root/.ethereum" --preload "utils.js"

logs-node2:
	docker-compose logs --tail=100 node2

copy-file-from-host-to-container:
	docker cp utils.js ethereumprivate_node2_1:/root/.ethereum
