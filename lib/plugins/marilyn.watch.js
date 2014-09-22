(function(factory) {

	// define marilyn using AMD
	if (typeof define === 'function' && define.amd) {
		define(factory);
	}

	// define marilyn by adding it to the window object
	else {
		window.Marilyn.watch = window.marilyn.watch = factory();
	}

})(function() {

	// Marilyn Watch is a plugin for keeping Marilyn collections in sync with Mongo documents
	// this is not included as a core Marilyn feature because it requires Node.js integration
	function plugin() {

		this.watch = function(queries, callback) {

			var modelName = this._name;

			// setup a watch callback
			this.on('__watch.' + modelName, callback);

			// sent a watch emit
			this.emit('__watch', modelName, queries);

		};

	}

	return plugin;

});