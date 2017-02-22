# makefile
package:=ehomeguru.com.cn/cloud/familyscreen/
export GOPATH:=$(HOME)/Learning/learning-git/go
# export PATH:=$(GOPATH)/bin:$(PATH)

all: install-all

build:
	go build $(package)

build-hello:
	go build github.com/bdtgzj/hello

install-golint:
	go get -u -v github.com/golang/lint

build-windows:
	GOOS=windows GOARCH=386 go build $(package)

install:
	go install $(package)

install-windows:
	GOOS=windows GOARCH=386 go install $(package)
	cp ${HOME}/Learning/learning-git/go/bin/windows_386/socket.exe /Volumes/ZLAN/Socket

install-all:
	GOOS=linux GOARCH=amd64 go install $(package)
	GOOS=darwin GOARCH=amd64 go install $(package)
	GOOS=windows GOARCH=amd64 go install $(package)
	GOOS=windows GOARCH=386 go install $(package)

test-all:
	go test -v -bench . github.com/bdtgzj/hello

test-hello:
	go test -v github.com/bdtgzj/hello

test-hello-sub:
	go test -v -run /T=1 github.com/bdtgzj/hello

test-hello-parallel:
	go test -v -run Parallel github.com/bdtgzj/hello

test-benchmark-hello:
	cd $(GOPATH)/src/github.com/bdtgzj/hello && \
	go test -v -bench Hel/B=

test-example-hello:
	cd $(GOPATH)/src/github.com/bdtgzj/hello && \
	go test -v hello_example_test.go

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

start-familyscreen:
	sudo familyscreen

start-nc:
	nc 127.0.0.1 502

start-nc-sn:
	#R_GET_SN:=echo -e '\x00\x01\x00\x00\x00\x07\x01\x03\x04\x00\x00\x00\x11'
	#cat <$(R_GET_SN) - | nc 127.0.0.1 502
# cat <(echo -e '\x00\x01\x00\x00\x00\x07\x01\x03\x04\x00\x00\x00\x11') - | nc 127.0.0.1 502

start-tcpdump:
	sudo tcpdump -nvXi lo0 tcp src port 502

start-nc1:
	nc 127.0.0.1 11502

start-node:
	node ../node/app.js

start-curl:
	curl http://127.0.0.1:3000
