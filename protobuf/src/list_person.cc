#include <iostream>
#include <fstream>
#include <string>
#include "src/protobuf/addressbook.pb.h"
using namespace std;

// Iterates though all people in the AddressBook and prints info about them.
void ListPerson(const addressbook::AddressBook& address_book) {
  for(int i = 0; i < address_book.person_size(); i++)
  {
    const addressbook::Person& person = address_book.person(i);
    cout << "Person ID: " << person.id() << endl;
    cout << "Name: " << person.name() << endl;
    if (person.has_email()) {
      cout << "Email: " << person.email() << endl;
    }
    
    for(int j = 0; j < person.phones_size(); j++)
    {
      const addressbook::Person::PhoneNumber& phone_number = person.phones(j);
      switch (phone_number.type())
      {
        case addressbook::Person::MOBILE:
          cout << "Mobile Phone: ";
          break;
        case addressbook::Person::HOME:
          cout << "Home Phone: ";
        case addressbook::Person::WORK:
          cout << "Work Phone: ";
      }
      cout << phone_number.phone() << endl;
    }
  }
}

// Main function: Reads the entire address book from a file and prints all the information inside.
int main(int argc, char const *argv[])
{
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  if (argc != 2) {
    cerr << "Usage: " << argv[0] << " ADDRESS_BOOK_FILE" << endl;
    return -1;
  }

  addressbook::AddressBook address_book;

  {
    // Read the existing address book.
    fstream input(argv[1], ios::in | ios::binary);
    if (!address_book.ParseFromIstream(&input)) {
      cerr << "Failed to parse address book." << endl;
      return -1;
    }
  }

  ListPerson(address_book);

  google::protobuf::ShutdownProtobufLibrary();

  return 0;
}
