(function() {

	// _socketConnection should be shared between all the models
	// it's a single connection to the server
	var _socketConnection;

	// the is where all the models will be stored so getters can be used to retrieve them
	var _models = {};

	function _modelGet(modelName) {
		return _models[modelName];
	};

	function _modelSet(modelName, init) {

		var model = _models[modelName] = {};

		model.name = modelName;

		// setup the private variables of the model
		// collection will store all the data in the model
		model._collection = [];

		model._befores = {};
		model._afters = {};

		model._receivers = {};

		// this is a variable that will be overrided each time scope needs to be retained
		model._retainScope;

		// Socket.IO events

		model.on = function(eventType, callback) {

			if (_socketConnection) {
				_socketConnection.on(eventType, function(data) {
					model._retainScope = callback;
					model._retainScope(data);
				});
			}

		};

		model.emit = function(eventType, data) {
			if (_socketConnection) {
				_socketConnection.emit(eventType, data);
			}
		};

		// internal events

		model.before = function(eventType, callback) {
			model._befores[eventType] = callback;
		};

		model.beforeRemove = function(eventType) {
			model._befores[eventType] = function() {};
		};

		model.after = function(eventType, callback) {
			model._afters[eventType] = callback;
		};

		model.afterRemove = function(eventType) {
			model._afters[eventType] = function() {};
		};

		model.inform = function(eventType, data) {
			if (model._receivers[eventType]) {
				model._retainScope = model._receivers[eventType];
				model._retainScope(data);
			}
		};

		model.receive = function(eventType, callback) {
			model._receivers[eventType] = callback;
		};

		model.receiveRemove = function(eventType) {

			if (_.isEmpty(eventType)) {
				model._receivers = {};
			} else {
				model._receivers[eventType] = function() {};
			}

		};

		// query methods

		model.create = function(element, callback) {

			if (model._befores.hasOwnProperty('create')) {
				model._befores['create'](function() {
					runComplete();
				});
			} else {
				runComplete();
			}

			function runComplete() {

				// check if the element matches the schema

				model._collection.push(element);

				model.inform('create', element);

				if (callback) {
					callback(null, element);
				}

				if (model._afters.hasOwnProperty('create')) {
					model._afters['create']();
				}

			}

		};

		model.read = function(query, callback) {

			if (model._befores.hasOwnProperty('read')) {
				model._befores['read'](function() {
					runComplete();
				});
			} else {
				runComplete();
			}

			function runComplete() {

				var readAll = false;

				// if no query was passed
				if (typeof query === 'function') {
					callback = query;
					readAll = true;
				}

				// or if the query object was empty
				else if (_.isEmpty(query)) {
					readAll = true;
				}

				var results = [];

				if (readAll) {
					results = model._collection;
				} else {
					results = _.where(model._collection, query);
				}

				if (callback) {
					callback(null, results);
				}

				if (model._afters.hasOwnProperty('read')) {
					model._afters['read']();
				}

			}

		};

		model.readOne = function(query, callback) {

			if (model._befores.hasOwnProperty('readOne')) {
				model._befores['readOne'](function() {
					runComplete();
				});
			} else {
				runComplete();
			}

			function runComplete() {

				var err = null;

				var results = _.where(model._collection, query);

				var result = null;

				if (results[0]) {
					result = results[0];
				} else {
					err = 'item not found';
				}

				if (callback) {
					callback(err, result);
				}

				if (model._afters.hasOwnProperty('readOne')) {
					model._afters['readOne']();
				}

			}

		};

		model.update = function(query, changes, callback) {

			if (model._befores.hasOwnProperty('update')) {
				model._befores['update'](function() {
					runComplete();
				});
			} else {
				runComplete();
			}

			function runComplete() {

				var err = null;

				var results = _.where(model._collection, query);

				if (results) {

					_.each(results, function(element) {

						_.each(changes, function(value, key) {
							element[key] = value;
						});

					});

					model.inform('update', results);

				} else {
					err = 'item not found';
				}

				if (callback) {
					callback(err, results);
				}

				if (model._afters.hasOwnProperty('update')) {
					model._afters['update']();
				}

			}

		};

		model.delete = function(query, callback) {

			if (model._befores.hasOwnProperty('delete')) {
				model._befores['delete'](function() {
					runComplete();
				});
			} else {
				runComplete();
			}

			function runComplete() {

				var err = null;

				var results = _.where(model._collection, query);

				if (results) {

					_.each(results, function(element) {

						var index = _.indexOf(model._collection, element);
						model._collection.splice(index, 1);

					});

					model.inform('delete', results);

				} else {
					err = 'item not found';
				}

				if (callback) {
					callback(err, results);
				}

				if (model._afters.hasOwnProperty('delete')) {
					model._afters['delete']();
				}

			}

		};

		// run the callback init function if it was passed
		if (init) {

			// make "this" work inside of the callback
			model.init = init;
			model.init();

			// delete the init function as it should only run once
			delete model.init;

		}

		return model;

	};

	// create the Marilyn object
	var Marilyn = {};

	Marilyn.config = function(socketConnection) {
		_socketConnection = socketConnection;
	};

	Marilyn.model = function(modelName, init) {
		if (_models[modelName]) {
			return _modelGet(modelName);
		} else {
			return _modelSet(modelName, init);
		}
	};

	Marilyn.modelRemove = function(modelName) {
		_models[modelName] = null;
	}

	window.Marilyn = Marilyn;

})();