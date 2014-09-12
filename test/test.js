/** CREATE */

QUnit.test('CREATE - before, receive, after, and callback events run when creating', function(assert) {

	var ran = {};
	ran.before = 0;
	ran.receive = 0;
	ran.after = 0;

	ran.callback = 0;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('create', function(data, next) {
			ran.before = 1;
			next();
		});

		this.after('create', function(data, next) {
			ran.after = 2;
			next();
		});

		this.receive('create', function(data) {
			ran.receive = 3;
		});

	});

	Model.create({}, function(err, data) {
		ran.callback = 4;
	});

	assert.equal(ran.before, 1, 'create before ran');
	assert.equal(ran.after, 2, 'create after ran');
	assert.equal(ran.receive, 3, 'create receive ran');
	assert.equal(ran.callback, 4, 'create callback ran');

});

QUnit.test('CREATE - before, receive, after, and callback events run when saving a new instance', function(assert) {

	var ran = {};
	ran.createBefore = 0;
	ran.createAfter = 0;
	ran.createReceive = 0;

	ran.saveBefore = 0;
	ran.saveAfter = 0;
	ran.saveReceive = 0;

	ran.callback = 0;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('save', function(data, next) {
			ran.saveBefore = 1;
			next();
		});

		this.before('create', function(data, next) {
			ran.createBefore = 2;
			next();
		});

		this.after('create', function(data, next) {
			ran.createAfter = 3;
			next();
		});

		this.after('save', function(data, next) {
			ran.saveAfter = 4;
			next();
		});

		this.receive('create', function(data) {
			ran.createReceive = 5;
		});

		this.receive('save', function(data) {
			ran.saveReceive = 6;
		});

	});

	var item = new Model();
	item.save(function(err, data) {
		ran.callback = 7;
	});

	assert.equal(ran.createBefore, 2, 'new create before ran');
	assert.equal(ran.createAfter, 3, 'new create after ran');
	assert.equal(ran.createReceive, 5, 'new create receive ran');

	assert.equal(ran.saveBefore, 1, 'new create before save ran');
	assert.equal(ran.saveAfter, 4, 'new create after save ran');
	assert.equal(ran.saveReceive, 6, 'new create receive save ran');

	assert.equal(ran.callback, 7, 'new create callback ran');

});

// /** READ */

QUnit.test('READ - before receive, after, and callback events run when reading all', function(assert) {

	var ran = {};
	ran.before = 0;
	ran.receive = 0;
	ran.after = 0;
	ran.callback = 0;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('read', function(data, next) {
			ran.before = 1;
			next();
		});

		this.after('read', function(data, next) {
			ran.after = 2;
			next();
		});

		this.receive('read', function(data) {
			ran.receive = 3;
		});

	});

	Model.read({}, function(err, data) {
		ran.callback = 4;
	});

	assert.equal(ran.before, 1, 'read before ran');
	assert.equal(ran.after, 2, 'read after ran');
	assert.equal(ran.receive, 3, 'read receive ran');
	assert.equal(ran.callback, 4, 'read callback ran');

});


QUnit.test('READONE - before receive, after, and callback events run when reading all', function(assert) {

	var ran = {};
	ran.before = 0;
	ran.receive = 0;
	ran.after = 0;
	ran.callback = 0;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('readOne', function(data, next) {
			ran.before = 1;
			next();
		});

		this.after('readOne', function(data, next) {
			ran.after = 2;
			next();
		});

		this.receive('readOne', function(data) {
			ran.receive = 3;
		});

	});

	Model.create({
		'id': 1
	}, function(err, data) {

		Model.readOne({
			'id': 1
		}, function(err, data) {
			ran.callback = 4;
		});

	});

	assert.equal(ran.before, 1, 'readOne before ran');
	assert.equal(ran.after, 2, 'readOne after ran');
	assert.equal(ran.receive, 3, 'readOne receive ran');
	assert.equal(ran.callback, 4, 'readOne callback ran');

});

/** UPDATE */

QUnit.test('UPDATE - before, receive, after, and callback events run when updating', function(assert) {

	var ran = {};
	ran.before = 0;
	ran.receive = 0;
	ran.after = 0;
	ran.callback = 0;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('update', function(oldData, newData, next) {
			ran.before = 1;
			next();
		});

		this.after('update', function(data, next) {
			ran.after = 2;
			next();
		});

		this.receive('update', function(data, newData) {
			ran.receive = 3;
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
			ran.callback = 4;
		});

	});

	assert.equal(ran.before, 1, 'update before ran');
	assert.equal(ran.after, 2, 'update after ran');
	assert.equal(ran.receive, 3, 'update receive ran');
	assert.equal(ran.callback, 4, 'update callback ran');

});

QUnit.test('UPDATE - before, receive, after, and callback events run when saving an existing instance', function(assert) {

	var ran = {};

	ran.updateBefore = 0;
	ran.updateReceive = 0;
	ran.updateAfter = 0;

	ran.saveBefore = 0;
	ran.saveReceive = 0;
	ran.saveAfter = 0;

	ran.callback = 0;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('save', function(data, next) {

			ran.saveBefore = 1;
			next();
		});

		this.before('update', function(oldData, newData, next) {
			ran.updateBefore = 2;
			next();
		});

		this.after('update', function(data, next) {
			ran.updateAfter = 3;
			next();
		});

		this.after('save', function(data, next) {
			ran.saveAfter = 4;
			next();
		});

		this.receive('update', function(data) {
			ran.updateReceive = 5;
		});

		this.receive('save', function(data) {
			ran.saveReceive = 6;
		});
	});

	Model.create({
		'id': 1
	}, function(err, data) {

		data.title = 'Something';

		data.save(function(err, data) {
			ran.callback = 7;
		});

	});

	assert.equal(ran.updateBefore, 2, 'update new instance before ran');
	assert.equal(ran.updateAfter, 3, 'update new instance after ran');
	assert.equal(ran.updateReceive, 5, 'update new instance receive ran');

	assert.equal(ran.saveBefore, 1, 'update new instance before ran');
	assert.equal(ran.saveAfter, 4, 'update new instance after ran');
	assert.equal(ran.saveReceive, 6, 'update new instance receive ran');

	assert.equal(ran.callback, 7, 'update new instance callback ran');

});

/** DELETE */

QUnit.test('DELETE - before, receive, after, and callback events run when deleting', function(assert) {

	var ran = {};
	ran.before = 0;
	ran.receive = 0;
	ran.after = 0;
	ran.callback = 0;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('delete', function(data, next) {
			ran.before = 1;
			next();
		});

		this.after('delete', function(data, next) {
			ran.after = 2;
			next();
		});

		this.receive('delete', function(data) {
			ran.receive = 3;
		});

	});

	Model.create({
		'id': 1
	}, function(err, data) {

		Model.del({
			'id': 1
		}, function(err, result) {
			ran.callback = 4;
		});

	});

	assert.equal(ran.before, 1, 'delete before ran');
	assert.equal(ran.after, 2, 'delete after ran');
	assert.equal(ran.receive, 3, 'delete receive ran');
	assert.equal(ran.callback, 4, 'delete callback ran');

});