// data
Tasks = new Mongo.Collection('tasks');

// Methods
Meteor.methods({
  addTask: function(text) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.insert({
      text: text,
      createdAt: new Date(),
      userId: Meteor.userId(),
      userName: Meteor.user().username
    });
  },
  deleteTask: function(id) {
    Tasks.remove(id);
  },
  setChecked: function(id, setChecked) {
    Tasks.update(id, {
      $set: {checked: setChecked}
    });
  },
  setPrivate: function(taskId, setToPrivate) {
    var task = Tasks.findOne(taskId);
    if (task.userId !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.update(taskId, {$set: {private: setToPrivate}});
  }
});


if (Meteor.isClient) {
  // db subscribe
  Meteor.subscribe("tasks");
  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.setDefault('hideCompleted', false);

  // Helpers
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

  Template.body.helpers({
    tasks: function() {
      if (Session.get('hideCompleted')) {
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
         return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    incompleteCount: function() {
      return Tasks.find({checked: {$ne: true}}).count();
    }
  });

  Template.task.helpers({
    isOwner: function() {
      return this.userId === Meteor.userId();
    }
  });

  // Events
  Template.body.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.body.events({
    //
    'submit .new-task' : function(event) {
      event.preventDefault();
      var text = event.target.text.value;
      Meteor.call('addTask', text);
      event.target.text.value = '';
    },
    //
    'change .hide-completed input': function(event) {
      Session.set('hideCompleted', event.target.checked);
    }
  });

  Template.task.events({
    'click .toggle-checked': function() {
      Meteor.call('setChecked', this._id, !this.checked);
    },
    'click .delete': function() {
      Meteor.call('deleteTask', this._id);
    },
    'click .toggle-private': function() {
      Meteor.call('setPrivate', this._id, !this.private);
    }
  });

  //Configure account-ui package
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  // db publish
  Meteor.publish('tasks', function() {
    return Tasks.find({
      $or: [
        {private: {$ne: true}},
        {userId: this.userId}
      ]
    });
  });
}
