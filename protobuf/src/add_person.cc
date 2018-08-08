#include <iostream>
#include <fstream>
#include <string>

#include "protobuf/addressbook.pb.h"

using namespace std;

// This function fills in a Address message based on user input
void PromptForAddress(addressbook::Person* person) {
  cout << "Enter person ID number: ";
  int id;
  cin >> id;
  person->set_id(id);
  cin.ignore(256, '\n');

  cout << "Enter name: ";
  getline(cin, *person->mutable_name());

  cout << "Enter email address (blank for none): ";
  string email;
  getline(cin, email);
  if (!email.empty()) {
    person->set_email(email);
  }

  while (true) {
    cout << "Enter a phone number (or leave blank to finish): ";
    string number;
    getline(cin, number);
    if (number.empty()) {
      break;
    }
    addressbook::Person::PhoneNumber* phone_number = person->add_phones();
    phone_number->set_phone(number);

    cout << "Is this a mobile, home, or work phone?";
    string type;
    getline(cin, type);
    if (type == "mobile") {
      phone_number->set_type(addressbook::Person::MOBILE);
    } else if(type == "home") {
      phone_number->set_type(addressbook::Person::PhoneType::Person_PhoneType_HOME);
    } else if(type == "work") {
      phone_number->set_type(addressbook::Person::WORK);
    } else {
      cout << "Unkown phone type, Using default." << endl;
    }
    
  }
}

// Main function: Reads the entire address book from a file,
// adds one person based on user input, then writes it back out to the same file.
int main(int argc, char const *argv[])
{
  // A function, verify the compatible between headers and linked library.
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  if (argc != 2) {
    cerr << "Usage: " << argv[0] << " ADDRESS_BOOK_FILE" << endl;
    return -1;
  }

  addressbook::AddressBook address_book;

  {
    // Read the existing address book.
    fstream input(argv[1], ios::in | ios::binary);
    if (!input) {
      cout << argv[1] << " : File not found. Creating a new file." << endl;
    } else if(!address_book.ParseFromIstream(&input)) {
      cerr << "Failed to parse address book." << endl;
      return -1;
    }
  }

  // Add an address.
  PromptForAddress(address_book.add_person());

  {
    // Write the new address book back to disk.
    fstream output(argv[1], ios::out | ios::binary);
    if (!address_book.SerializeToOstream(&output)) {
      cerr << "Failed to write address book." << endl;
      return -1;
    }
  }

  // Optional:  Delete all global objects allocated by libprotobuf.
  google::protobuf::ShutdownProtobufLibrary();

  return 0;
}




