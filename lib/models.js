Todos = new Meteor.Collection('todos');
Lists = new Meteor.Collection('lists');

//not used in the applcaton for testing the collection schemas
Books = new Mongo.Collection("books");

var Schemas = {};

Schemas.Book = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    author: {
        type: String,
        label: "Author"
    },
    copies: {
        type: Number,
        label: "Number of copies",
        min: 0
    },
    lastCheckedOut: {
        type: Date,
        label: "Last date this book was checked out",
        optional: true  
    },
    summary: {
        type: String,
        label: "Brief summary",
        optional: true,
        max: 1000
    },
    view:{
        type: String,
        label: "test",
        optional:true,
        max:1000
    }
});
Books.attachSchema(Schemas.Book);

Books.allow({
    insert: function(){
        return true;
    }
});