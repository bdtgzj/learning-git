.PHONY: graphiql/build

# [graph-server] graph-express
run-graphql-express:
	node graphql-express/graphql-express.js

# [graph-client]
request-hello:
	curl -X POST http://localhost:4000/graphql -d '{"query": "{ hello }" }' -H 'Content-Type: application/json'

# [graph-client] graphiql
build-graphiql:
	npm run build-graphiql

run-graphiql:
	npm run run-graphiql