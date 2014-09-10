/** CREATE */

QUnit.test('CREATE - before, receive, after, and callback events run when creating', function(assert) {

	var ran = {};
	ran.before = false;
	ran.receive = false;
	ran.after = false;
	ran.callback = false;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('create', function(data, next) {
			ran.before = true;
			next();
		});

		this.after('create', function(data, next) {
			ran.after = true;
			next();
		});

		this.receive('create', function(data) {
			ran.receive = true;
		});

	});

	Model.create({}, function(err, data) {
		ran.callback = true;
	});

	assert.ok(ran.before, 'create before ran');
	assert.ok(ran.after, 'create after ran');
	assert.ok(ran.receive, 'create receive ran');
	assert.ok(ran.callback, 'create callback ran');

});

QUnit.test('CREATE - before, receive, after, and callback events run when saving a new instance', function(assert) {

	var ran = {};
	ran.before = false;
	ran.receive = false;
	ran.after = false;
	ran.callback = false;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('create', function(data, next) {
			ran.before = true;
			next();
		});

		this.after('create', function(data, next) {
			ran.after = true;
			next();
		});

		this.receive('create', function(data) {
			ran.receive = true;
		});

	});

	var item = new Model();
	item.save(function(err, data) {
		ran.callback = true;
	});

	assert.ok(ran.before, 'new create before ran');
	assert.ok(ran.after, 'new create after ran');
	assert.ok(ran.receive, 'new create receive ran');
	assert.ok(ran.callback, 'new create callback ran');

});

// /** READ */

QUnit.test('READ - before receive, after, and callback events run when reading all', function(assert) {

	var ran = {};
	ran.before = false;
	ran.receive = false;
	ran.after = false;
	ran.callback = false;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('read', function(data, next) {
			ran.before = true;
			next();
		});

		this.after('read', function(data, next) {
			ran.after = true;
			next();
		});

		this.receive('read', function(data) {
			ran.receive = true;
		});

	});

	Model.read({}, function(err, data) {
		ran.callback = true;
	});

	assert.ok(ran.before, 'read before ran');
	assert.ok(ran.after, 'read after ran');
	assert.ok(ran.receive, 'read receive ran');
	assert.ok(ran.callback, 'read callback ran');

});


QUnit.test('READONE - before receive, after, and callback events run when reading all', function(assert) {

	var ran = {};
	ran.before = false;
	ran.receive = false;
	ran.after = false;
	ran.callback = false;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('readOne', function(data, next) {
			ran.before = true;
			next();
		});

		this.after('readOne', function(data, next) {
			ran.after = true;
			next();
		});

		this.receive('readOne', function(data) {
			ran.receive = true;
		});

	});

	Model.create({
		'id': 1
	}, function(err, data) {

		Model.readOne({
			'id': 1
		}, function(err, data) {
			ran.callback = true;
		});

	});

	assert.ok(ran.before, 'readOne before ran');
	assert.ok(ran.after, 'readOne after ran');
	assert.ok(ran.receive, 'readOne receive ran');
	assert.ok(ran.callback, 'readOne callback ran');

});

/** UPDATE */

QUnit.test('UPDATE - before, receive, after, and callback events run when updating', function(assert) {

	var ran = {};
	ran.before = false;
	ran.receive = false;
	ran.after = false;
	ran.callback = false;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('update', function(oldData, newData, next) {
			ran.before = true;
			next();
		});

		this.after('update', function(data, next) {
			ran.after = true;
			next();
		});

		this.receive('update', function(data, newData) {
			ran.receive = true;
		});

	});

	Model.create({
		'id': 1
	}, function(err, data) {

		Model.update({
			'id': 1
		}, {
			'title': 'Something'
		}, function(err, data) {
			ran.callback = true;
		});

	});

	assert.ok(ran.before, 'update before ran');
	assert.ok(ran.after, 'update after ran');
	assert.ok(ran.receive, 'update receive ran');
	assert.ok(ran.callback, 'update callback ran');

});

QUnit.test('UPDATE - before, receive, after, and callback events run when saving an existing instance', function(assert) {

	var ran = {};
	ran.before = false;
	ran.receive = false;
	ran.after = false;
	ran.callback = false;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('update', function(oldData, newData, next) {
			ran.before = true;
			next();
		});

		this.after('update', function(data, next) {
			ran.after = true;
			next();
		});

		this.receive('update', function(data) {
			ran.receive = true;
		});

	});

	Model.create({
		'id': 1
	}, function(err, data) {

		data.title = 'Something';

		data.save(function(err, data) {
			ran.callback = true;
		});

	});

	assert.ok(ran.before, 'update new instance before ran');
	assert.ok(ran.after, 'update new instance after ran');
	assert.ok(ran.receive, 'update new instance receive ran');
	assert.ok(ran.callback, 'update new instance callback ran');

});

/** DELETE */

QUnit.test('DELETE - before, receive, after, and callback events run when deleting', function(assert) {

	var ran = {};
	ran.before = false;
	ran.receive = false;
	ran.after = false;
	ran.callback = false;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('delete', function(data, next) {
			ran.before = true;
			next();
		});

		this.after('delete', function(data, next) {
			ran.after = true;
			next();
		});

		this.receive('delete', function(data) {
			ran.receive = true;
		});

	});

	Model.create({
		'id': 1
	}, function(err, data) {

		Model.del({
			'id': 1
		}, function(err, result) {
			ran.callback = true;
		});

	});

	assert.ok(ran.before, 'delete before ran');
	assert.ok(ran.after, 'delete after ran');
	assert.ok(ran.receive, 'delete receive ran');
	assert.ok(ran.callback, 'delete callback ran');

});