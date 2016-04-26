#!/bin/bash

# c=compile e=execute
mode=$1

param=$2

base_dir=`pwd`

if test -z $mode; then 
	echo "Syntax: ./build.sh [c | e]"
	exit 0
fi

if [ $mode == "c" ]; then
	javac -classpath ./libs/mybatis-3.3.1.jar -d ./bin ./src/Student.java ./src/StudentMapper.java ./src/Mybatis.java ./src/MybatisMapper.java
	echo "compile successful!"
elif [ $mode == "e" ]; then
	java -classpath ./:./bin:./libs/mybatis-3.3.1.jar:./libs/mysql-connector-java-5.1.38-bin.jar Mybatis $param
fi