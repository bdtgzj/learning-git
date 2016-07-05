run:
	node app.js

start-mongod:
	mongod -dbpath ./other/data/

start-mongo:
	mongo

init-mongod:
	mongo
	use db_ehomeguru;
	db.counters.insert({_id: "userid", seq: 1});
	db.users.save({_id: 1, name:'俞晓东', loginName:'yxdc002', password:'16b4d433eeef71946e93341822786a196549c2c5', email:'yxdc002@ehomeguru.com.cn', mphone: '13222880055', familyID: 17});

start-curl:
# make start-curl resource=region
# make start-curl resource=device?filter=577381aa9d38be3c52cc7b69
# make start-curl resource=instruction?filter=5773855a9d38be3c52cc7b6c
	curl --basic --user yxdc002:admin6 http://localhost:3000/${resource}

start-curl-post:
	curl --basic --user yxdc002:admin6 -H "Content-Type: application/json" -X POST -d '{"data": [{"id": "1", "type": "instruction", "attributes": {"instruction": "0 0 0 0 0 6 1 5 72 0 255 0"}}]}' http://localhost:3000/instruction/exec

start-jmeter:
	jmeter.sh &