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
	curl http://localhost:3000/water