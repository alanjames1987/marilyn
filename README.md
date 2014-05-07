Marilyn
---

Marilyn is a WebSocket driven, real time, evented, model layer. It has a query system similar to Mongoose. It also has Socket.IO support out of the box.

Angular, Backbone, Ember, and many other libraries provide model layers which are AJAX driven. While variations on these models exist they are usually only useful if you're using the entire framework they are built to work with.

Marilyn can work with any framework, or by itself if you just need more data abstraction.

## Usage

Install the module with bower:
`$ bower install marilyn`

Include the `marilyn.js` file and it's dependency, `underscore.js` or `lodash.js`.

Upon including the `marilyn.js` file a global `Marilyn` object will be created.

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
  Marilyn.config(socket);
</script>
```

After this Marilyn has `on` and `emit` methods that we should call instead of the Socket.IO methods. This allows us to centralize all data querying and data fetching methods to Marilyn.

### Creating Model

Like Mongoose, Marilyn creates models using the `model` method. 

```js
var myModel = Marilyn.model('someModelName');
```

`myModel` is now a Marilyn model, containing query and event methods.

You can also create a model by passing the `Marilyn.model` methods a second parameter, a callback function. Within this callback function `this` represents the model that has been created.

```js
var myModel = Marilyn.model('someModelName', function(){
	
	// "this" is the same as myModel

});
```

Like Mongoose, the Marilyn model created, called `someModelName`, can now be accessed from the global Marilyn object. 

This allows you to use closures to create a model and not pollute the global scope.

```js
// myModel.js

(function(){

	var nonPollutingModel = Marilyn.model('someModelName', function(){
		
		this.on('someSocketEvent', function(data){
			// do something with data in model
			this.inform('someBrowserEvent', data);
		});
	
	});
	
	nonPollutingModel.on('someOtherSocketEvent', function(data){
		// do something else
	});
	
})();
```

```js
// myController.js

(function(){

	var myModel = Marilyn.model('someModelName');
	
	myModel.receive('someBrowserEvent', function(){
		// do something with data in controller
	});
	
})();
```

### Event Handlers

Marilyn has four types of event handlers, socket events, browser events, befores, and afters. 

Socket events are for communicating from your model to a socket server, or from a socket server to your model.

Browser events are for communicating between your model and controller, or client side logic layer.

Befores run before a query method is executed. 

Afters run after a query method is executed.

Socket events and browser events have two methods, an event listener and an event dispatcher.

#### Socket Events

The socket event methods behave the same events as Socket.IO. They are `on` and `emit`.

#### Browser Events

Browser event methods are `receive` and `inform`. They act very similarly to Socket.IO's `on` and `emit`. 

They can send data and receive data with callback functions.

```js
// myModel.js

Marilyn.model('someModelName', function(){
	
	this.inform('modelReady');

});
```

```js
// myController.js

var myModel = Marilyn.model('someModelName');

myModel.receive('modelReady', function(){
	// do something here
});
```

All query events inform receivers after completion. This is best shown in the next example.

#### Befores and Afters

Befores and afters are similar to Mongoose's `pre` and `post` events. Befores are triggered before all querys, and afters are after the query.

All befores and afters are passed data that they can manipulate and a next method, which must be called in order to progress the flow control.

```js
// myModel.js

Marilyn.model('someModelName', function(){
	
	this.before('create', function(data, next){
		console.log('I ran before');
		next();
	});

	this.after('create', function(data){
		console.log('I ran after');
	});

});
```

```js
// myController.js

var myModel = Marilyn.model('someModelName');

myModel.receive('create', function(data){
	console.log('I ran in the controller create receiver')
});


myModel.create({}, function(err, result){
	console.log('I ran in the controller create callback')
});
```

This code above will output this.

```
I ran before
I ran in the controller create receiver
I ran after
I ran in the controller create callback
```

### Querying Data

Each Marilyn model has a private variable called `_collection`, which can be populated with an array of data. All query methods query this variable.

There are ten query methods, `create`, `createSilent`, `read`, `readSilent`, `readOne`, `readOneSilent`, `update`, `updateSilent`, and `del`, `delSilent`.

All silent query methods don't trigger befores or afters.

Befores can alter anything about the objects returned.

```js
myModel.create({
	'someProperty':'someValue'
}, function(err, result){
	// result is the object created
});

myModel.read({
	'director':'George Lucas'
}, function(err, results){
	// results is an array of all the objects found
});

myModel.readOne({
	id:1138
}, function(err, result){
	// result is the single object found
});

myModel.update({
	id:1138
}, {
	'propertyToUpdate':'someValue'
}, function(err, results){
	// results is an array of all the objects updated
});

myModel.del({
	id:1138
}, function(err results){
	// results is an array of all the objects deleted
});
```

`err` is always populated if nothing matches the query.

Author
---
Alan James: [alanjames1987@gmail.com](mailto:alanjames1987@gmail.com)

License
---
Licensed under [MIT](https://github.com/alanjames1987/marilynjs/blob/master/LICENSE).