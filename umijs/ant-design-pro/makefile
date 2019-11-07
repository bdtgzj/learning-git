TAIL?=100
URL=http://localhost:7003/

# start:
#	yarn start

# env
sourcecode-checkout:
	svn checkout https://svn.velico.cn/svn/XZL-Administrator

# docker-compose
start:
	docker-compose -f docker-compose.dev.yml --verbose up -d
restart:
	docker-compose -f docker-compose.dev.yml restart
stop:
	docker-compose -f docker-compose.dev.yml down
logs:
	docker-compose -f docker-compose.dev.yml logs --tail=$(TAIL) xzl-administrator

start-prod:
	docker-compose -f docker-compose.prod.yml up -d

# xzl-administrator
get-shell:
	docker exec -it xzl-api-db bash

# test
req:
	curl -ivL $(URL)

