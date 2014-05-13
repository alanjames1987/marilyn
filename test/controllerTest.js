(function() {

	var model = Marilyn.model('something');
	window.model = model;

	model.receive('create', function(data) {
		if (__testCreate) {
			console.log('receive create');
			console.log(data);
		}
	});

	model.receive('read', function(data) {
		if (__testRead) {
			console.log('receive read');
			console.log(data);
		}
	});

	model.receive('readOne', function(data) {
		if (__testReadOne) {
			console.log('receive readOne');
			console.log(data);
		}
	});

	model.receive('update', function(data) {
		if (__testUpdate) {
			console.log('receive update');
			console.log(data);
		}
	});

	model.receive('delete', function(data) {
		if (__testDelete) {
			console.log('receive delete');
			console.log(data);
		}
	});

	console.log('-------------------- CREATE --------------------');

	// create 5 objects
	for (var i = 5; i > 0; i--) {

		model.create({
			'id': i,
			'title': 'someTitle'
		}, function(err, results) {
			if (__testCreate) {
				console.log('callback create')
				console.log('ERR ' + err);
				console.log(results);
			}
		});

	}

	console.log('-------------------- READ --------------------');

	model.read({
		'title': 'someTitle'
	}, function(err, results) {

		if (__testRead) {

			console.log('callback read');
			console.log('ERR ' + err);
			console.log(results);

		}

		results[0].save(function(err, result) {
			if (__testSave) {
				console.log('callback save');
				console.log('ERR ' + err);
				console.log(result);
			}
		});

	});

	console.log('-------------------- READONE --------------------');

	// with no err
	model.readOne({
		'id': 2
	}, function(err, result) {
		if (__testReadOne) {
			console.log('callback readOne');
			console.log('ERR ' + err);
			console.log(result);
		}
	});

	// with err
	model.readOne({
		'id': 6
	}, function(err, result) {
		if (__testReadOne) {
			console.log('callback readOne');
			console.log('ERR ' + err);
			console.log(result);
		}
	});

	console.log('-------------------- UPDATE --------------------');

	model.update({
		'id': 2
	}, {
		'title': 'someOtherTitle'
	}, function(err, results) {
		if (__testUpdate) {
			console.log('callback update');
			console.log('ERR ' + err);
			console.log(results);
		}
	});

	console.log('-------------------- DELETE --------------------');

})();