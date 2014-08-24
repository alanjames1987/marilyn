(function() {

	var Model = Marilyn.model('something');
	window.Model = Model;

	// Local listeners

	Model.receive('create', function(data) {
		if (__testCreate) {
			console.log('receive create');
			console.log(data);
		}
	});

	Model.receive('read', function(data) {
		if (__testRead) {
			console.log('receive read');
			console.log(data);
		}
	});

	Model.receive('readOne', function(data) {
		if (__testReadOne) {
			console.log('receive readOne');
			console.log(data);
		}
	});

	Model.receive('update', function(data) {
		if (__testUpdate) {
			console.log('receive update');
			console.log(data);
		}
	});

	Model.receive('delete', function(data) {
		if (__testDelete) {
			console.log('receive delete');
			console.log(data);
		}
	});

	// Server listeners

	Model.on('response', function(data){
		console.log('on response');
		console.log(data);
	});

	console.log('-------------------- NEW --------------------');

	// create 5 objects
	for (var i = 5; i > 0; i--) {

		var item = new Model();
		item.id = i;
		item.title = 'someTitle';
		item.save(function(err, result){
			console.log('callback new');
			console.log('ERR ' + err);
			console.log(result);
		});

	}

	for (var i = 10; i > 5; i--) {

		var item = new Model({
			'id' : i,
			'title' : 'someTitle'
		});
		item.save(function(err, result){
			console.log('callback new');
			console.log('ERR ' + err);
			console.log(result);
		});

	}

	console.log('-------------------- CREATE --------------------');

	// create 5 objects
	for (var i = 5; i > 0; i--) {

		Model.create({
			'id' : i,
			'title' : 'someTitle'
		}, function(err, results) {
			if (__testCreate) {
				console.log('callback create');
				console.log('ERR ' + err);
				console.log(results);
			}
		});

	}

	console.log('-------------------- READ --------------------');

	Model.read({
		'title' : 'someTitle'
	}, function(err, results) {

		if (__testRead) {
			console.log('callback read');
			console.log('ERR ' + err);
			console.log(results);
		}

		results[0].title = 'Some Other Title';

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
	Model.readOne({
		'id' : 2
	}, function(err, result) {
		if (__testReadOne) {
			console.log('callback readOne');
			console.log('ERR ' + err);
			console.log(result);
		}
	});

	// with err
	Model.readOne({
		'id' : 6
	}, function(err, result) {
		if (__testReadOne) {
			console.log('callback readOne');
			console.log('ERR ' + err);
			console.log(result);
		}
	});

	console.log('-------------------- UPDATE --------------------');

	Model.update({
		'id' : 2
	}, {
		'title' : 'someOtherTitle'
	}, function(err, results) {
		if (__testUpdate) {
			console.log('callback update');
			console.log('ERR ' + err);
			console.log(results);
		}
	});

	console.log('-------------------- DELETE --------------------');

	Model.del({
		'id' : 2
	}, function(err, results) {
		if (__testDelete) {
			console.log('callback update');
			console.log('ERR ' + err);
			console.log(results);
		}
	});

	console.log('-------------------- EMIT --------------------');
	Model.emit('request');

})();
