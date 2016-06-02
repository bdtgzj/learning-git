# makefile
package:=github.com/bdtgzj/socket/
export GOPATH:=/Users/xiaodongyu/Learning/learning-git/go

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