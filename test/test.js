/** CREATE */

QUnit.test('CREATE - before, after, receive, and callback events run when creating and have valid data types', function(assert) {

	var ran = {};
	ran.before = 0;
	ran.after = 0;
	ran.receive = 0;
	ran.callback = 0;

	var typeValid = {};
	typeValid.before = false;
	typeValid.after = false;
	typeValid.receive = false;
	typeValid.callback = false;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('create', function(data, next) {
			ran.before = 1;
			typeValid.before = _.isObject(data);
			next();
		});

		this.after('create', function(data, next) {
			ran.after = 2;
			typeValid.after = _.isObject(data);
			next();
		});

		this.receive('create', function(data) {
			ran.receive = 3;
			typeValid.receive = _.isObject(data);
		});

	});

	Model.create({
		'someProperty': 'someValue',
	}, function(err, data) {
		ran.callback = 4;
		typeValid.callback = _.isObject(data);
	});

	assert.equal(ran.before, 1, 'create before ran');
	assert.equal(ran.after, 2, 'create after ran');
	assert.equal(ran.receive, 3, 'create receive ran');
	assert.equal(ran.callback, 4, 'create callback ran');

	assert.ok(typeValid.before, 'create before has valid data type');
	assert.ok(typeValid.after, 'create after has valid data type');
	assert.ok(typeValid.receive, 'create receive has valid data type');

});

QUnit.test('CREATE - before, after, receive, and callback events run when saving a new instance and have valid data types', function(assert) {

	var ran = {};
	ran.createBefore = 0;
	ran.createAfter = 0;
	ran.createReceive = 0;
	ran.saveBefore = 0;
	ran.saveAfter = 0;
	ran.saveReceive = 0;
	ran.callback = 0;

	var typeValid = {};
	typeValid.createBefore = false;
	typeValid.createAfter = false;
	typeValid.createReceive = false;
	typeValid.saveBefore = false;
	typeValid.saveAfter = false;
	typeValid.saveReceive = false;
	typeValid.callback = false;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('save', function(data, next) {
			ran.saveBefore = 1;
			typeValid.saveBefore = _.isObject(data);
			next();
		});

		this.before('create', function(data, next) {
			ran.createBefore = 2;
			typeValid.createBefore = _.isObject(data);
			next();
		});

		this.after('create', function(data, next) {
			ran.createAfter = 3;
			typeValid.createAfter = _.isObject(data);
			next();
		});

		this.after('save', function(data, next) {
			ran.saveAfter = 4;
			typeValid.saveAfter = _.isObject(data);
			next();
		});

		this.receive('create', function(data) {
			ran.createReceive = 5;
			typeValid.createReceive = _.isObject(data);
		});

		this.receive('save', function(data) {
			ran.saveReceive = 6;
			typeValid.saveReceive = _.isObject(data);
		});

	});

	var item = new Model();
	item.someProperty = 'someValue';

	item.save(function(err, data) {
		ran.callback = 7;
		typeValid.callback = _.isObject(data);
	});

	assert.equal(ran.createBefore, 2, 'new create before ran');
	assert.equal(ran.createAfter, 3, 'new create after ran');
	assert.equal(ran.createReceive, 5, 'new create receive ran');
	assert.equal(ran.saveBefore, 1, 'new create before save ran');
	assert.equal(ran.saveAfter, 4, 'new create after save ran');
	assert.equal(ran.saveReceive, 6, 'new create receive save ran');
	assert.equal(ran.callback, 7, 'new create callback ran');

	assert.ok(typeValid.createBefore, 'new create before has valid data type');
	assert.ok(typeValid.createAfter, 'new create after has valid data type');
	assert.ok(typeValid.createReceive, 'new create receive has valid data type');
	assert.ok(typeValid.saveBefore, 'new create before save has valid data type');
	assert.ok(typeValid.saveAfter, 'new create after save has valid data type');
	assert.ok(typeValid.saveReceive, 'new create receive save has valid data type');
	assert.ok(typeValid.callback, 'new create calback has valid data type');

});

// /** READ */

QUnit.test('READ - before receive, after, and callback events run when reading all and have valid data types', function(assert) {

	var ran = {};
	ran.before = 0;
	ran.receive = 0;
	ran.after = 0;
	ran.callback = 0;

	var typeValid = {};
	typeValid.before = false;
	typeValid.after = false;
	typeValid.receive = false;
	typeValid.callback = false;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('read', function(query, next) {
			ran.before = 1;
			typeValid.before = _.isObject(query);
			next();
		});

		this.after('read', function(data, next) {
			ran.after = 2;
			typeValid.after = _.isArray(data);
			next();
		});

		this.receive('read', function(data) {
			ran.receive = 3;
			typeValid.receive = _.isArray(data);
		});

	});

	Model.read({
		'someProperty': 'someValue',
	}, function(err, data) {
		ran.callback = 4;
		typeValid.callback = _.isArray(data);
	});

	assert.equal(ran.before, 1, 'read before ran');
	assert.equal(ran.after, 2, 'read after ran');
	assert.equal(ran.receive, 3, 'read receive ran');
	assert.equal(ran.callback, 4, 'read callback ran');

	assert.ok(typeValid.before, 'read before has valid data type');
	assert.ok(typeValid.after, 'read after has valid data type');
	assert.ok(typeValid.receive, 'read receive has valid data type');
	assert.ok(typeValid.callback, 'read callback has valid data type');

});

QUnit.test('READONE - before receive, after, and callback events run when reading all and have valid data types', function(assert) {

	var ran = {};
	ran.before = 0;
	ran.receive = 0;
	ran.after = 0;
	ran.callback = 0;

	var typeValid = {};
	typeValid.before = false;
	typeValid.after = false;
	typeValid.receive = false;
	typeValid.callback = false;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('readOne', function(query, next) {
			ran.before = 1;
			typeValid.before = _.isObject(query);
			next();
		});

		this.after('readOne', function(data, next) {
			ran.after = 2;
			typeValid.after = _.isObject(data);
			next();
		});

		this.receive('readOne', function(data) {
			ran.receive = 3;
			typeValid.receive = _.isObject(data);
		});

	});

	Model.create({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		Model.readOne({
			'id': 1
		}, function(err, data) {
			ran.callback = 4;
			typeValid.callback = _.isObject(data);
		});

	});

	assert.equal(ran.before, 1, 'readOne before ran');
	assert.equal(ran.after, 2, 'readOne after ran');
	assert.equal(ran.receive, 3, 'readOne receive ran');
	assert.equal(ran.callback, 4, 'readOne callback ran');

	assert.ok(typeValid.before, 'readOne before has valid data type');
	assert.ok(typeValid.after, 'readOne after has valid data type');
	assert.ok(typeValid.receive, 'readOne receive has valid data type');
	assert.ok(typeValid.callback, 'readOne callback has valid data type');

});

/** UPDATE */

QUnit.test('UPDATE - before, after, receive, and callback events run when updating and have valid data types', function(assert) {

	var ran = {};
	ran.before = 0;
	ran.receive = 0;
	ran.after = 0;
	ran.callback = 0;

	var typeValid = {};
	typeValid.before = false;
	typeValid.after = false;
	typeValid.receive = false;
	typeValid.callback = false;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('update', function(searchQuery, updateQuery, next) {
			ran.before = 1;
			typeValid.before = (_.isObject(searchQuery) && _.isObject(updateQuery));
			next();
		});

		this.after('update', function(data, next) {
			ran.after = 2;
			typeValid.after = _.isArray(data);
			next();
		});

		this.receive('update', function(data) {
			ran.receive = 3;
			typeValid.receive = _.isArray(data);
		});

	});

	Model.create({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		Model.update({
			'id': 1,
		}, {
			'title': 'Something',
		}, function(err, data) {
			ran.callback = 4;
			typeValid.callback = _.isArray(data);
		});

	});

	assert.equal(ran.before, 1, 'update before ran');
	assert.equal(ran.after, 2, 'update after ran');
	assert.equal(ran.receive, 3, 'update receive ran');
	assert.equal(ran.callback, 4, 'update callback ran');

	assert.ok(typeValid.before, 'update before has valid data type');
	assert.ok(typeValid.after, 'update after has valid data type');
	assert.ok(typeValid.receive, 'update receive has valid data type');
	assert.ok(typeValid.callback, 'update callback has valid data type');

});

QUnit.test('UPDATE - before, after, receive, and callback events run when saving an existing instance and have valid data types', function(assert) {

	var ran = {};
	ran.updateBefore = 0;
	ran.updateReceive = 0;
	ran.updateAfter = 0;
	ran.saveBefore = 0;
	ran.saveReceive = 0;
	ran.saveAfter = 0;
	ran.callback = 0;

	var typeValid = {};
	typeValid.updateBefore = false;
	typeValid.updateAfter = false;
	typeValid.updateReceive = false;
	typeValid.saveBefore = false;
	typeValid.saveAfter = false;
	typeValid.saveReceive = false;
	typeValid.callback = false;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('save', function(data, next) {
			ran.saveBefore = 1;
			typeValid.saveBefore = _.isObject(data);
			next();
		});

		this.before('update', function(searchQuery, updateQuery, next) {
			ran.updateBefore = 2;
			typeValid.updateBefore = (_.isObject(searchQuery) && _.isObject(updateQuery));
			next();
		});

		this.after('update', function(data, next) {
			ran.updateAfter = 3;
			typeValid.updateAfter = _.isArray(data);
			next();
		});

		this.after('save', function(data, next) {
			ran.saveAfter = 4;
			typeValid.saveAfter = _.isObject(data);
			next();
		});

		this.receive('update', function(data) {
			ran.updateReceive = 5;
			typeValid.updateReceive = _.isArray(data);
		});

		this.receive('save', function(data) {
			ran.saveReceive = 6;
			typeValid.saveReceive = _.isObject(data);
		});

	});

	Model.create({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		data.title = 'Something';
		data.someProperty = 'someValue';

		data.save(function(err, data) {
			ran.callback = 7;
			typeValid.callback = _.isObject(data);
		});

	});

	assert.equal(ran.updateBefore, 2, 'update new instance before ran');
	assert.equal(ran.updateAfter, 3, 'update new instance after ran');
	assert.equal(ran.updateReceive, 5, 'update new instance receive ran');
	assert.equal(ran.saveBefore, 1, 'update new instance before ran');
	assert.equal(ran.saveAfter, 4, 'update new instance after ran');
	assert.equal(ran.saveReceive, 6, 'update new instance receive ran');
	assert.equal(ran.callback, 7, 'update new instance callback ran');

	assert.ok(typeValid.updateBefore, 'update new instance before has valid data type');
	assert.ok(typeValid.updateAfter, 'update new instance after has valid data type');
	assert.ok(typeValid.updateReceive, 'update new instance receive has valid data type');
	assert.ok(typeValid.saveBefore, 'update new instance before has valid data type');
	assert.ok(typeValid.saveAfter, 'update new instance after has valid data type');
	assert.ok(typeValid.saveReceive, 'update new instance receive has valid data type');
	assert.ok(typeValid.callback, 'update new instance callback has valid data type');

});

/** DELETE */

QUnit.test('DELETE - before, after, receive, and callback events run when deleting and have valid data types', function(assert) {

	var ran = {};
	ran.before = 0;
	ran.receive = 0;
	ran.after = 0;
	ran.callback = 0;

	var typeValid = {};
	typeValid.before = false;
	typeValid.after = false;
	typeValid.receive = false;
	typeValid.callback = false;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('delete', function(query, next) {
			ran.before = 1;
			typeValid.before = _.isObject(query);
			next();
		});

		this.after('delete', function(data, next) {
			ran.after = 2;
			typeValid.after = _.isArray(data);
			next();
		});

		this.receive('delete', function(data) {
			ran.receive = 3;
			typeValid.receive = _.isArray(data);
		});

	});

	Model.create({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		Model.del({
			'id': 1
		}, function(err, results) {
			ran.callback = 4;
			typeValid.callback = _.isArray(results);
		});

	});

	assert.equal(ran.before, 1, 'delete before ran');
	assert.equal(ran.after, 2, 'delete after ran');
	assert.equal(ran.receive, 3, 'delete receive ran');
	assert.equal(ran.callback, 4, 'delete callback ran');

	assert.ok(typeValid.before, 'delete before has valid data type');
	assert.ok(typeValid.after, 'delete after has valid data type');
	assert.ok(typeValid.receive, 'delete receive has valid data type');
	assert.ok(typeValid.callback, 'delete callback has valid data type');

});

QUnit.test('DELETE - before, after, and receive events run when calling instance delete method and have valid data types', function(assert) {

	var ran = {};
	ran.before = 0;
	ran.receive = 0;
	ran.after = 0;
	ran.callback = 0;

	var typeValid = {};
	typeValid.before = false;
	typeValid.after = false;
	typeValid.receive = false;
	typeValid.callback = false;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		this.before('delete', function(query, next) {
			ran.before = 1;
			typeValid.before = _.isObject(query);
			next();
		});

		this.after('delete', function(data, next) {
			ran.after = 2;
			typeValid.after = _.isArray(data);
			next();
		});

		this.receive('delete', function(data) {
			ran.receive = 3;
			typeValid.receive = _.isArray(data);
		});

	});

	Model.create({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		data.delete(function(err, results) {
			ran.callback = 4;
			typeValid.callback = _.isArray(results);
		});

	});

	assert.equal(ran.before, 1, 'delete before ran');
	assert.equal(ran.after, 2, 'delete after ran');
	assert.equal(ran.receive, 3, 'delete receive ran');
	assert.equal(ran.callback, 4, 'delete callback ran');

	assert.ok(typeValid.before, 'delete before has valid data type');
	assert.ok(typeValid.after, 'delete after has valid data type');
	assert.ok(typeValid.receive, 'delete receive has valid data type');
	assert.ok(typeValid.callback, 'delete callback has valid data type');

});

/** MULTIPLE EVENTS */

QUnit.test('MULTIPLE - before, after, and receive, events run when passed for multiple event types and have valid data types', function(assert) {

	var ran = {};
	ran.before = 0;
	ran.receive = 0;
	ran.after = 0;

	var name = uuid.v4();

	var Model = marilyn.model(name, function() {

		// updates can't be tested for because it's callback has a different signature

		this.before(['create', 'read', 'readOne', 'delete'], function(data, next) {
			ran.before++;
			next();
		});

		this.after(['create', 'read', 'readOne', 'delete'], function(data, next) {
			ran.after++;
			next();
		});

		this.receive(['create', 'read', 'readOne', 'delete'], function(data) {
			ran.receive++;
		});

	});

	Model.create({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		Model.read({});

		Model.readOne({
			'id': 1
		});

		Model.del({
			'id': 1
		});

	});

	assert.equal(ran.before, 4, 'multiple before ran');
	assert.equal(ran.after, 4, 'multiple after ran');
	assert.equal(ran.receive, 4, 'multiple receive ran');

});

/** PLUGINS */

QUnit.test('PLUGINS - plugin functions are called', function(assert) {

	var called = false;

	var name = uuid.v4();

	var Model = marilyn.model(name);

	Model.use(function() {
		called = true;
	});

	assert.ok(called, 'plugin function was called');

});

QUnit.test('PLUGINS - plugin functions have the correct context', function(assert) {

	var called = false;

	var name = uuid.v4();
	var randomTestingValue = uuid.v4();

	var Model = marilyn.model(name, function() {
		this.testingPropery = randomTestingValue;
	});

	Model.use(function() {
		if (randomTestingValue === this.testingPropery) {
			called = true;
		}
	});

	assert.ok(called, 'plugin function was called');

});