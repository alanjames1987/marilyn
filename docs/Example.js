// MODEL

// first parameter is model name, second is a function for setting up the model class
var marilynModel = Marilyn.model('modelName', function(){

	// "this" represents the instance of the Marilyn model

	// the data types representing each object in the model
	// should be as close to Mongoose as possible
	this.schema({
		// "this" represents the schema properties
	});

	// function to run before an emit to the server
	this.pre('socketEventToServer', function(){

		// this ?????

	});

	// function to run after an emit to the server
	this.post('socketEventToServer', function(){

		// this ?????

	});

	// listen for an event coming from the server
	this.on('socketEventFromServer', function(data){

		// all models include an internal collection which is the data
		this.collection.variable = data.variable;
		this.collection.anotherVariable = data.anotherVariable;

		// "this" represents the model
		this.inform('customInformationEvent', data);

	});

});

// CONTROLLER

// models can be accessed through the Marilyn object
var marilynModel = Marilyn.model('modelName');

// send data to server
marilynModel.emit('socketEvent', data);

// listen for events
// built in events are create, update, delete, and change
// first passed in these events is the model collection
// second passed will always be the element affected, created, updated, deleted
// it will include an _index variable added by Marilyn of the element it is or was

marilynModel.when('create', function(collection, createdElement){

});

// the third element of update will be the old element
marilynModel.when('update', function(collection, updatedElement, oldUpdatedElement){

});

// second will be what was deleted
// the deleteElement will include an _index variable added by Marilyn
marilynModel.when('delete', function(collection, deleteElement){

});

// second passed will be the old collection
marilynModel.when('change', function(collection, oldCollection){

});

// custom events can be listened for which pass custom data
marilynModel.when('customInformationEvent', function(data){

});

// marilyn should be able to do anything mongoose can do
marilynModel.find({}, function(err, results){
	// results is the data returned, which itself will be a marilyn model
});