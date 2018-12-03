.PHONY: run start-mongod

NPM=$(NODE10_HOME)/bin/npm
MONGOD=$(MONGODB404_HOME)/bin/mongod

run:
	$(NPM) run dev-inspect

req:
	curl -ivL http://127.0.0.1:7001/

start-mongod:
	$(MONGOD) -dbpath ./other/data/