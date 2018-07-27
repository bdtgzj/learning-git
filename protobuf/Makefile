.PHONY: cpp clean

protobuf:
	protoc --cpp_out=. src/protobuf/addressbook.proto

clean:
	rm -f src/protobuf/*.h src/protobuf/*.cc bin/*_cpp

cpp: add_person_cpp list_person_cpp

add_person_cpp: protobuf
	pkg-config --cflags protobuf  # fails if protobuf is not installed
	c++ -I ./ -std=c++11 src/add_person.cc src/protobuf/addressbook.pb.cc -o bin/add_person_cpp `pkg-config --cflags --libs protobuf`

list_person_cpp: protobuf
	pkg-config --cflags protobuf  # fails if protobuf is not installed
	c++ -I ./ -std=c++11 src/list_person.cc src/protobuf/addressbook.pb.cc -o bin/list_person_cpp `pkg-config --cflags --libs protobuf`