Marilyn
---

[![Bower version](https://badge.fury.io/bo/marilyn.svg)](http://badge.fury.io/bo/marilyn)

<img src="http://marilynjs.com/img/marilyn.jpg" />

Marilyn is a client side, WebSocket driven, Pub/Sub, model layer with a query system similar to Mongoose.

Angular, Backbone, Ember, and many other libraries provide model layers which are AJAX driven. While variations on these models exist they are usually only useful if you're using the entire framework they are built to work with.

Marilyn can work with any framework, or by itself if you just need more data abstraction.

## Installation

Install the module with bower:

```bash
$ bower install marilyn
```

or download it from GitHub and copy the files into your application.

### Using Script Tags

Include a script for the `marilyn.js` or `marilyn-min.js` file after a script for it's dependency, `underscore.js` or `lodash.js`.

Upon including the `marilyn.js` file a global `marilyn` object will be available.

### Using AMD

Marilyn can also be loaded using any AMD compliant module loader such as [RequireJS](http://www.requirejs.org/).

Marilyn's only dependency is `underscore`.

## Usage

### Configure Socket.IO

Before using Marilyn with Socket.IO you have to configure Marilyn to use Socket.IO's socket connection. Lets use the client side example connection from the Socket.IO website to demonstrate this.

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost');
</script>
```

This creates a global variable called `socket`. This variable should be passed to Marilyn so Marilyn can use the Socket.IO `on` and `emit` methods.

```html
<script>
  marilyn.config(socket);
</script>
```

After this Marilyn has `on` and `emit` methods that we should call instead of the Socket.IO methods. This allows us to centralize all data querying and data fetching methods to Marilyn.

### Creating Model

Like Mongoose, Marilyn creates models using the `model` method.

```js
var MyModel = marilyn.model('someModelName');
```

`MyModel` is now a Marilyn model, containing query and event methods.

You can also create a model by passing the `marilyn.model` methods a second parameter, a callback function. Within this callback function `this` represents the model that has been created.

```js
var MyModel = marilyn.model('someModelName', function(){

	// "this" is the same as MyModel

});
```

Like Mongoose, the Marilyn model created, called `someModelName`, can now be accessed from the global `marilyn` object. 

This allows you to use self executing functions to create a model and not pollute the global scope.

```js
// myModel.js

(function(){

	var NonPollutingModel = marilyn.model('someModelName', function(){

		this.on('someSocketEvent', function(data){
			// do something with data in model
			this.inform('someBrowserEvent', data);
		});

	});

	NonPollutingModel.on('someOtherSocketEvent', function(data){
		// do something else
	});

})();
```

```js
// myController.js

(function(){

	var MyModel = marilyn.model('someModelName');

	MyModel.receive('someBrowserEvent', function(){
		// do something with data in controller
	});

})();
```

### Adding Data to Models

All models have a `_collection` variable.

**Setting the `_collection` variable directly without the CRUD methods or the collection setter will not create this `__id` property and Marilyn will not function properly.**

This variable is an array of all the objects you have stored in your frontend model.

To populate this variable you can use the built in CRUD methods listed below, or the `collection` setter.

If you use the CRUD methods various built in callbacks will be run. If you use the `collection` setter these callback functions won't be called.

```js
marilyn.model('someModelName', function(){

	this.on('someSocketEvent', function(data){

		// sets the _collection array
		// this won't trigger any callbacks
		this.collection(data);

	});

	this.on('someOtherServerEvent', function(data){

		// pushes a new object into the _collection array and performs many other tasks
		// this will trigger all the "create" callbacks
		this.create(data);

	});

});
```

When new objects are added to the `_collection` variable a property of `__id` is added to them so Marilyn can internally track them.

### Event Handlers

Marilyn has four types of event handlers, socket events, browser events, befores, and afters.

Socket events are for communicating from your model to a socket server, or from a socket server to your model.

Browser events are for communicating between your model and controller, or client side logic layer.

Befores run before a query method is executed.

Afters run after a query method is executed.

Socket events and browser events have two methods, an event listener and an event dispatcher.

#### Socket Events

The socket event methods behave the same events as Socket.IO.

They are `on` and `emit`.

Refere to [Socket.IO documentation](http://socket.io/) to understand how these work.

#### Browser Events

Browser event methods are `receive` and `inform`. They act very similarly to Socket.IO's `on` and `emit`.

They can send data and receive data with callback functions.

```js
// myModel.js

marilyn.model('someModelName', function(){

	this.inform('modelReady', {
		'someKey':'someValue'
	});

});
```

```js
// myController.js

var MyModel = marilyn.model('someModelName');

MyModel.receive('modelReady', function(data){
	// do something here
	// data is the object passed from the inform method
});
```

All query events inform receivers after completion. This is best shown in the next example.

#### Befores and Afters

Befores and afters are similar to Mongoose's `pre` and `post` events. Befores are triggered before all querys, and afters are after the query.

All befores and afters, except for `update`, are passed data that they can manipulate and a next method, which must be called in order to progress the flow control.

**The update `before` is passed three parameters, the old data, the new data, and next.**

```js
// myModel.js

marilyn.model('someModelName', function(){

	this.before('create', function(data, next){
		// this is useful for validating data before a CRUD method runs
		console.log('I ran before');
		next();
	});

	this.after('create', function(data, next){
		// this is useful for altering data before it's returned to the controller
		console.log('I ran after');
		next();
	});

});
```

```js
// myController.js

var MyModel = marilyn.model('someModelName');

MyModel.receive('create', function(data){
	console.log('I ran in the controller create receiver')
});


MyModel.create({}, function(err, result){
	console.log('I ran in the controller create callback')
});
```

This code above will output this.

```
I ran before
I ran after
I ran in the controller create receiver
I ran in the controller create callback
```

Befores and afters are triggered from `create`, `read`, `readOne`, `update`, `delete`, and `save`.

Sometimes multiple befores and afters can be triggered by one CRUD method being invoked, for example the `save` method can trigger befores and afters for `create` and `update` in addition to befores and afters for `save` events.

### Querying Data with CRUD Methods

Each Marilyn model has a private variable called `_collection`, which can be populated with an array of data. All query methods query this variable.

There are ten query methods, `create`, `createSilent`, `read`, `readSilent`, `readOne`, `readOneSilent`, `update`, `updateSilent`, `del`, and `delSilent`.

All silent query methods don't trigger befores or afters.

#### Create

```js
var myModel = new MyModel();
myModel.title = 'Star Wars';
myModel.director = 'George Lucas';

// calling the save method will trigger create befores and afters as well as save befores and afters
myModel.save(function(err, result){
	// result is the object created
});

// OR

var myModel = new MyModel({
	'title':'Star Wars',
	'director':'George Lucas'
});

// calling the save method will trigger create befores and afters as well as save befores and afters
myModel.save(function(err, result){
	// result is the object created
});

// OR

// calling the create method will trigger create befores and afters, but not saves
MyModel.create({
	'title':'Star Wars',
	'director':'George Lucas'
}, function(err, result){
	// result is the object created
});
```

#### Read

```js
// calling the read method will trigger read befores and afters
// calling read without passing a query will read all
MyModel.read(function(err, results){
	// results is an array of all the objects in the collection
});

// calling the read method will trigger read befores and afters
MyModel.read({
	'director':'George Lucas'
}, function(err, results){
	// results is an array of all the objects found
});

// calling this method will trigger read befores and afters
MyModel.read({
	'director':'George Lucas'
}, function(err, results){
	// results is an array of all the objects found
});

// calling this method will trigger readOne befores and afters
MyModel.readOne({
	'id':1138
}, function(err, result){
	// result is the single object found
});
```

#### Update

```js
// updates using readOne
MyModel.readOne({
	'id':1138
}, function(err, result){

	result.director = 'George Lucas';

	// calling the save method will trigger update befores and afters as well as save befores and afters
	result.save(function(err, result){
		// result is the updated object
	});

});

// calling this method will trigger update befores and afters
MyModel.update({
	'id':1138
}, {
	'propertyToUpdate':'someValue'
}, function(err, results){
	// results is an array of all the objects updated
});
```

#### Delete

```js
// calling this method will trigger delete befores and afters
MyModel.del({
	'id':1138
}, function(err results){
	// results is an array of all the objects deleted
});
```

`err` is always populated if nothing matches the query.

Query methods don't directly call the server, you must call the server manually with `emit` either before or after query methods are invoked. This makes `before` and `after` very useful for server integration.

Dependencies
---

Marilyn requires Underscore >= 1.5.0. Get it from: [http://underscorejs.org/](http://underscorejs.org/)

Author
---

Alan James: [alanjames1987@gmail.com](mailto:alanjames1987@gmail.com)

License
---

Licensed under [MIT](https://github.com/alanjames1987/marilyn/blob/master/LICENSE).
