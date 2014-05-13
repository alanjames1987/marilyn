(function() {

	Marilyn.model('something', function() {

		this.before('create', function(data, next) {
			if (__testCreate) {
				console.log('before create');
				console.log(data);
			}
			next();
		});

		this.after('create', function(data, next) {
			if (__testCreate) {
				console.log('after create');
				console.log(data);
			}
			next();
		});

		this.before('read', function(data, next) {
			if (__testRead) {
				console.log('before read');
				console.log(data);
			}
			next();
		});

		this.after('read', function(data, next) {
			if (__testRead) {
				console.log('after read');
				console.log(data);
			}
			next();
		});

		this.before('readOne', function(data, next) {
			if (__testReadOne) {
				console.log('before readOne');
				console.log(data);
			}
			next();
		});

		this.after('readOne', function(data, next) {
			if (__testReadOne) {
				console.log('after readOne');
				console.log(data);
			}
			next();
		});

		this.before('update', function(query, updateQuery, next) {
			if (__testUpdate) {
				console.log('before update');
				console.log(data);
			}
			next();
		});

		this.after('update', function(data, next) {
			if (__testUpdate) {
				console.log('after update');
				console.log(data);
			}
			next();
		});

		this.before('delete', function(data, next) {
			if (__testDelete) {
				console.log('before delete');
				console.log(data);
			}
			next();
		});

		this.after('delete', function(data, next) {
			if (__testDelete) {
				console.log('after delete');
				console.log(data);
			}
			next();
		});

	});

})();