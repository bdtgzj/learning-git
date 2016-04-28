#!/bin/bash

mode=$1

if [ -z $mode ]; then
	mode="null"
fi

# clean
if [ $mode == "clean" ]; then
	mvn clean
	echo "clean successfully!"
	exit 1
fi

# get dependencies
if [ $mode == "depen" ]; then
	mvn dependency:copy-dependencies
	echo "get dependencies successfully!"
	exit 1
fi

# compile && package
mvn package

# run
java -cp target/springframework-start-0.1.0.jar:target/dependency/* com.bdtgzj.springframework.App