*marilyn!*
---

Marilyn is a WebSocket driven, real time, evented, model layer. It has a query system similar to Mongoose. It also has Socket.IO support out of the box.

Angular, Backbone, Ember, and many other libraries provide model layers which are AJAX driven. While variations on these models exist they are usually only useful if you're using the entire framework they are built to work with.

Marilyn can work with any framework, or by itself if you just need more data abstraction.

## Usage

Include the `marilyn.js` file and it's dependency, `underscore.js` or `lodash.js`.

Upon including the `marilyn.js` file a global `Marilyn` object will be created.

### Configure Socket.IO

Before using Marilyn with Socket.IO you have to configure Marilyn to use Socket.IO's socket connection. Lets use the client side example connection from the Socket.IO website to demonstrate this.

```
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost');
</script>
```

This creates a global variable called `socket`. This variable should be passed to Marilyn so Marilyn can use the Socket.IO `on` and `emit` methods.

```
<script>
  Marilyn.config(socket);
</script>
```

After this Marilyn has `on` and `emit` methods that we should call instead of the Socket.IO methods.
This allows us to centralize all data querying and data fetching methods to Marilyn.

### Creating Model

Like Mongoose, Marilyn creates models using the `model` method. 

```js
var myModel = Marilyn.model('someModelName');
```

`myModel` is now a Marilyn model, containing query and event methods.

You can also create a model by passing the `Marilyn.model` methods a second parameter, a callback function. Within this callback function `this` represents the model that has been created.

```js
var myModel = Marilyn.model('someModelName', function(){
	
	// this is the same as myModel

});
```

Author
---
Alan James: [alanjames1987@gmail.com](mailto:alanjames1987@gmail.com)

License
---
Licensed under [MIT](https://github.com/alanjames1987/marilynjs/blob/master/LICENSE).