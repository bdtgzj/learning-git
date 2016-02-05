// data
Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.body.helpers({
    tasks1: [
      {text: "This is task 1."},
      {text: "This is task 2."},
      {text: "This is task 3."}
    ]
  });

  Template.body.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });



}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
