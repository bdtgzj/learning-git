# makefile
package:=github.com/bdtgzj/socket/
export GOPATH:=$(HOME)/Learning/learning-git/go

all: install-all

build:
	go build $(package)

build-windows:
	GOOS=windows GOARCH=386 go build $(package)

install:
	go install $(package)

install-windows:
	GOOS=windows GOARCH=386 go install $(package)

install-all:
	GOOS=linux GOARCH=amd64 go install $(package)
	GOOS=darwin GOARCH=amd64 go install $(package)
	GOOS=windows GOARCH=amd64 go install $(package)
	GOOS=windows GOARCH=386 go install $(package)

get-beanstalkd:
	brew install beanstalkd

get-beanstalkd-cli:
	wget -O ~/Downloads/beanstalkd-cli-osx.tar.gz "https://github.com/schickling/beanstalkd-cli/releases/download/0.3.0/beanstalkd-cli-osx.tar.gz"
	tar -zxvf ~/Downloads/beanstalkd-cli-osx.tar.gz -C /usr/local/bin
	beanstalkd-cli --help

start-beanstalkd:
	beanstalkd -l 0.0.0.0 -p 11300

start-beanstalkd-cli:
	beanstalkd-cli monitor

start-socket:
	sudo socket

start-nc:
	nc 127.0.0.1 502

start-node:
	node ../node/app.js

start-curl:
	curl http://127.0.0.1:3000