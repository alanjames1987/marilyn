/** CREATEONE */

QUnit.test('CREATEONE - before, after, receive, and callback events are given the correct context', function(assert) {

	var context = {};
	context.before = false;
	context.after = false;
	context.receive = false;
	context.callback = false;

	var name = uuid.v4();

	var contextCheck = uuid.v4();

	var Model = marilyn.model(name, {

		schema: {
			_id: String,
			created: Date,
			updated: Date,
		},

		http: {
			createOne: '',
			readOne: '',
			readMany: '',
			updateOne: '',
			deleteOne: '',
			login: '/api/v1/user/login.json',
			logout: '/api/v1/user/logout.json',
			customWhatever: '',
		},

		ws: {
			createOne: '',
			readOne: '',
			readMany: '',
			updateOne: '',
			deleteOne: '',
			login: '/api/v1/user/login.json',
			logout: '/api/v1/user/logout.json',
			customWhatever: '',
		},

		caching: {
			ttl: 50000,
			http: {
				createOne: false,
				readOne: 50000,
				readMany: 50000,
				updateOne: 50000,
				deleteOne: 50000,
				login: false,
				customWhatever: false,
			}
		},

	}, function() {

		var self = this;

		self.contextCheck = contextCheck;

		self.$before('createOne', function(data, next) {
			context.before = (self.contextCheck === contextCheck);
			next();
		});

		self.$after('createOne', function(data, next) {
			context.after = (self.contextCheck === contextCheck);
			next();
		});

		self.$receive('createOne', function(data) {
			context.receive = (self.contextCheck === contextCheck);
		});

	});

	Model.$createOne({
		'contextCheck': contextCheck,
	}, function(err, data) {
		var self = this;
		context.callback = (self.contextCheck === contextCheck);
	});

	assert.ok(context.before, 'create before context');
	assert.ok(context.after, 'create after context');
	assert.ok(context.receive, 'create receive context');
	assert.ok(context.callback, 'create callback context');

});

QUnit.test('CREATEONE - before, after, receive, and callback events are given the correct context when saving a new instance', function(assert) {

	var context = {};
	context.createBefore = false;
	context.createAfter = false;
	context.createReceive = false;
	context.saveBefore = false;
	context.saveAfter = false;
	context.saveReceive = false;
	context.callback = false;

	var name = uuid.v4();

	var contextCheck = uuid.v4();

	var Model = marilyn.model(name, function() {

		var self = this;

		self.contextCheck = contextCheck;

		self.$before('createOne', function(data, next) {
			context.createBefore = (self.contextCheck === contextCheck);
			next();
		});

		self.$after('createOne', function(data, next) {
			context.createAfter = (self.contextCheck === contextCheck);
			next();
		});

		self.$receive('createOne', function(data) {
			context.createReceive = (self.contextCheck === contextCheck);
		});

		self.$before('save', function(data, next) {
			context.saveBefore = (self.contextCheck === contextCheck);
			next();
		});

		self.$after('save', function(data, next) {
			context.saveAfter = (self.contextCheck === contextCheck);
			next();
		});

		self.$receive('save', function(data) {
			context.saveReceive = (self.contextCheck === contextCheck);
		});

	});

	var item = new Model();
	item.someProperty = 'someValue';

	item.$save(function(err, data) {
		var self = this;
		context.callback = (self.contextCheck === contextCheck);
	});

	assert.ok(context.createBefore, 'new create before context');
	assert.ok(context.createAfter, 'new create after context');
	assert.ok(context.createReceive, 'new create receive context');
	assert.ok(context.saveBefore, 'new create before context');
	assert.ok(context.saveAfter, 'new create after context');
	assert.ok(context.saveReceive, 'new create receive context');
	assert.ok(context.callback, 'new create callback context');

});

QUnit.test('CREATEONE - before, after, receive, and callback events run when creating and have valid data types', function(assert) {

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

		var self = this;

		self.$before('createOne', function(data, next) {
			ran.before = 1;
			typeValid.before = _.isObject(data);
			next();
		});

		self.$after('createOne', function(data, next) {
			ran.after = 2;
			typeValid.after = _.isObject(data);
			next();
		});

		self.$receive('createOne', function(data) {
			ran.receive = 3;
			typeValid.receive = _.isObject(data);
		});

	});

	Model.$createOne({
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

QUnit.test('CREATEONE - before, after, receive, and callback events run when saving a new instance and have valid data types', function(assert) {

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

		var self = this;

		self.$before('save', function(data, next) {
			ran.saveBefore = 1;
			typeValid.saveBefore = _.isObject(data);
			next();
		});

		self.$before('createOne', function(data, next) {
			ran.createBefore = 2;
			typeValid.createBefore = _.isObject(data);
			next();
		});

		self.$after('createOne', function(data, next) {
			ran.createAfter = 3;
			typeValid.createAfter = _.isObject(data);
			next();
		});

		self.$after('save', function(data, next) {
			ran.saveAfter = 4;
			typeValid.saveAfter = _.isObject(data);
			next();
		});

		self.$receive('createOne', function(data) {
			ran.createReceive = 5;
			typeValid.createReceive = _.isObject(data);
		});

		self.$receive('save', function(data) {
			ran.saveReceive = 6;
			typeValid.saveReceive = _.isObject(data);
		});

	});

	var item = new Model();
	item.someProperty = 'someValue';

	item.$save(function(err, data) {
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

/** READ */

QUnit.test('READMANY - before, after, receive, and callback events are given the correct context', function(assert) {

	var context = {};
	context.before = false;
	context.after = false;
	context.receive = false;
	context.callback = false;

	var name = uuid.v4();

	var contextCheck = uuid.v4();

	var Model = marilyn.model(name, function() {

		var self = this;

		self.contextCheck = contextCheck;

		self.$before('readMany', function(data, next) {
			context.before = (self.contextCheck === contextCheck);
			next();
		});

		self.$after('readMany', function(data, next) {
			context.after = (self.contextCheck === contextCheck);
			next();
		});

		self.$receive('readMany', function(data) {
			context.receive = (self.contextCheck === contextCheck);
		});

	});

	Model.$readMany({
		'someProperty': 'someValue',
	}, function(err, data) {
		var self = this;
		context.callback = (self.contextCheck === contextCheck);
	});

	assert.ok(context.before, 'read before context');
	assert.ok(context.after, 'read after context');
	assert.ok(context.receive, 'read receive context');
	assert.ok(context.callback, 'read callback context');

});

QUnit.test('READMANY - before receive, after, and callback events run when reading all and have valid data types', function(assert) {

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

		var self = this;

		self.$before('readMany', function(query, next) {
			ran.before = 1;
			typeValid.before = _.isObject(query);
			next();
		});

		self.$after('readMany', function(data, next) {
			ran.after = 2;
			typeValid.after = _.isArray(data);
			next();
		});

		self.$receive('readMany', function(data) {
			ran.receive = 3;
			typeValid.receive = _.isArray(data);
		});

	});

	Model.$readMany({
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

QUnit.test('READONE - before, after, receive, and callback events are given the correct context', function(assert) {

	var context = {};
	context.before = false;
	context.after = false;
	context.receive = false;
	context.callback = false;

	var name = uuid.v4();

	var contextCheck = uuid.v4();

	var Model = marilyn.model(name, function() {

		var self = this;

		self.contextCheck = contextCheck;

		self.$before('readOne', function(data, next) {
			context.before = (self.contextCheck === contextCheck);
			next();
		});

		self.$after('readOne', function(data, next) {
			context.after = (self.contextCheck === contextCheck);
			next();
		});

		self.$receive('readOne', function(data) {
			context.receive = (self.contextCheck === contextCheck);
		});

	});

	Model.$createOne({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		Model.$readOne({
			'id': 1
		}, function(err, data) {
			var self = this;
			context.callback = (self.contextCheck === contextCheck);
		});

	});

	assert.ok(context.before, 'readOne before context');
	assert.ok(context.after, 'readOne after context');
	assert.ok(context.receive, 'readOne receive context');
	assert.ok(context.callback, 'readOne callback context');

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

		var self = this;

		self.$before('readOne', function(query, next) {
			ran.before = 1;
			typeValid.before = _.isObject(query);
			next();
		});

		self.$after('readOne', function(data, next) {
			ran.after = 2;
			typeValid.after = _.isObject(data);
			next();
		});

		self.$receive('readOne', function(data) {
			ran.receive = 3;
			typeValid.receive = _.isObject(data);
		});

	});

	Model.$createOne({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		Model.$readOne({
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

/** UPDATEMANY */

QUnit.test('UPDATEMANY - before, after, receive, and callback events are given the correct context', function(assert) {

	var context = {};
	context.before = false;
	context.after = false;
	context.receive = false;
	context.callback = false;

	var name = uuid.v4();

	var contextCheck = uuid.v4();

	var Model = marilyn.model(name, function() {

		var self = this;

		self.contextCheck = contextCheck;

		self.$before('updateMany', function(searchQuery, updateQuery, next) {
			context.before = (self.contextCheck === contextCheck);
			next();
		});

		self.$after('updateMany', function(data, next) {
			context.after = (self.contextCheck === contextCheck);
			next();
		});

		self.$receive('updateMany', function(data) {
			context.receive = (self.contextCheck === contextCheck);
		});

	});

	Model.$createOne({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		Model.$updateMany({
			'id': 1,
		}, {
			'title': 'Something',
		}, function(err, data) {
			var self = this;
			context.callback = (self.contextCheck === contextCheck);
		});

	});

	assert.ok(context.before, 'update before context');
	assert.ok(context.after, 'update after context');
	assert.ok(context.receive, 'update receive context');
	assert.ok(context.callback, 'update callback context');

});

QUnit.test('CREATEONE - before, after, receive, and callback events are given the correct context', function(assert) {

	var context = {};
	context.before = false;
	context.after = false;
	context.receive = false;
	context.callback = false;

	var name = uuid.v4();

	var contextCheck = uuid.v4();

	var Model = marilyn.model(name, function() {

		var self = this;

		self.contextCheck = contextCheck;

		self.$before('createOne', function(data, next) {
			context.before = (self.contextCheck === contextCheck);
			next();
		});

		self.$after('createOne', function(data, next) {
			context.after = (self.contextCheck === contextCheck);
			next();
		});

		self.$receive('createOne', function(data) {
			context.receive = (self.contextCheck === contextCheck);
		});

	});

	Model.$createOne({
		'contextCheck': contextCheck,
	}, function(err, data) {
		var self = this;
		context.callback = (self.contextCheck === contextCheck);
	});

	assert.ok(context.before, 'create before context');
	assert.ok(context.after, 'create after context');
	assert.ok(context.receive, 'create receive context');
	assert.ok(context.callback, 'create callback context');

});

QUnit.test('UPDATEONE - before, after, receive, and callback events are given the correct context when saving a new instance', function(assert) {

	var context = {};
	context.updateBefore = false;
	context.updateAfter = false;
	context.updateReceive = false;
	context.saveBefore = false;
	context.saveAfter = false;
	context.saveReceive = false;
	context.callback = false;

	var name = uuid.v4();

	var contextCheck = uuid.v4();

	var Model = marilyn.model(name, function() {

		var self = this;

		self.contextCheck = contextCheck;

		self.$before('updateOne', function(searchQuery, updateQuery, next) {
			context.updateBefore = (self.contextCheck === contextCheck);
			next();
		});

		self.$after('updateOne', function(data, next) {
			context.updateAfter = (self.contextCheck === contextCheck);
			next();
		});

		self.$receive('updateOne', function(data) {
			context.updateReceive = (self.contextCheck === contextCheck);
		});

		self.$before('save', function(data, next) {
			context.saveBefore = (self.contextCheck === contextCheck);
			next();
		});

		self.$after('save', function(data, next) {
			context.saveAfter = (self.contextCheck === contextCheck);
			next();
		});

		self.$receive('save', function(data) {
			context.saveReceive = (self.contextCheck === contextCheck);
		});

	});

	Model.$createOne({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		data.title = 'Something';
		data.someProperty = 'someValue';

		data.$save(function(err, data) {
			var self = this;
			context.callback = (self.contextCheck === contextCheck);
		});

	});

	assert.ok(context.updateBefore, 'new update before context');
	assert.ok(context.updateAfter, 'new update after context');
	assert.ok(context.updateReceive, 'new update receive context');
	assert.ok(context.saveBefore, 'new update before context');
	assert.ok(context.saveAfter, 'new update after context');
	assert.ok(context.saveReceive, 'new update receive context');
	assert.ok(context.callback, 'new update callback context');

});

QUnit.test('UPDATEMANY - before, after, receive, and callback events run when updating and have valid data types', function(assert) {

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

		var self = this;

		self.$before('updateMany', function(searchQuery, updateQuery, next) {
			ran.before = 1;
			typeValid.before = (_.isObject(searchQuery) && _.isObject(updateQuery));
			next();
		});

		self.$after('updateMany', function(data, next) {
			ran.after = 2;
			typeValid.after = _.isArray(data);
			next();
		});

		self.$receive('updateMany', function(data) {
			ran.receive = 3;
			typeValid.receive = _.isArray(data);
		});

	});

	Model.$createOne({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		Model.$updateMany({
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

QUnit.test('UPDATEONE - before, after, receive, and callback events run when saving an existing instance and have valid data types', function(assert) {

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

		var self = this;

		self.$before('save', function(data, next) {
			ran.saveBefore = 1;
			typeValid.saveBefore = _.isObject(data);
			next();
		});

		self.$before('updateOne', function(searchQuery, updateQuery, next) {
			ran.updateBefore = 2;
			typeValid.updateBefore = (_.isObject(searchQuery) && _.isObject(updateQuery));
			next();
		});

		self.$after('updateOne', function(data, next) {
			ran.updateAfter = 3;
			typeValid.updateAfter = _.isArray(data);
			next();
		});

		self.$after('save', function(data, next) {
			ran.saveAfter = 4;
			typeValid.saveAfter = _.isObject(data);
			next();
		});

		self.$receive('updateOne', function(data) {
			ran.updateReceive = 5;
			typeValid.updateReceive = _.isArray(data);
		});

		self.$receive('save', function(data) {
			ran.saveReceive = 6;
			typeValid.saveReceive = _.isObject(data);
		});

	});

	Model.$createOne({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		data.title = 'Something';
		data.someProperty = 'someValue';

		data.$save(function(err, data) {
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

/** DELETEMANY */

QUnit.test('DELETEMANY - before, after, receive, and callback events are given the correct context', function(assert) {

	var context = {};
	context.before = false;
	context.after = false;
	context.receive = false;
	context.callback = false;

	var name = uuid.v4();

	var contextCheck = uuid.v4();

	var Model = marilyn.model(name, function() {

		var self = this;

		self.contextCheck = contextCheck;

		self.$before('deleteMany', function(data, next) {
			context.before = (self.contextCheck === contextCheck);
			next();
		});

		self.$after('deleteMany', function(data, next) {
			context.after = (self.contextCheck === contextCheck);
			next();
		});

		self.$receive('deleteMany', function(data) {
			context.receive = (self.contextCheck === contextCheck);
		});

	});

	Model.$createOne({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		Model.$deleteMany({
			'id': 1
		}, function(err, results) {
			var self = this;
			context.callback = (self.contextCheck === contextCheck);
		});

	});

	assert.ok(context.before, 'delete before context');
	assert.ok(context.after, 'delete after context');
	assert.ok(context.receive, 'delete receive context');
	assert.ok(context.callback, 'delete callback context');

});

QUnit.test('DELETEMANY - before, after, receive, and callback events run when deleting and have valid data types', function(assert) {

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

		var self = this;

		self.$before('deleteMany', function(query, next) {
			ran.before = 1;
			typeValid.before = _.isObject(query);
			next();
		});

		self.$after('deleteMany', function(data, next) {
			ran.after = 2;
			typeValid.after = _.isArray(data);
			next();
		});

		self.$receive('deleteMany', function(data) {
			ran.receive = 3;
			typeValid.receive = _.isArray(data);
		});

	});

	Model.$createOne({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		Model.$deleteMany({
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

QUnit.test('DELETEONE - before, after, and receive events run when calling instance delete method and have valid data types', function(assert) {

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

		var self = this;

		self.$before('deleteMany', function(query, next) {
			ran.before = 1;
			typeValid.before = _.isObject(query);
			next();
		});

		self.$after('deleteMany', function(data, next) {
			ran.after = 2;
			typeValid.after = _.isArray(data);
			next();
		});

		self.$receive('deleteMany', function(data) {
			ran.receive = 3;
			typeValid.receive = _.isArray(data);
		});

	});

	Model.$createOne({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		data.$deleteOne(function(err, results) {
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

		var self = this;

		// updates can't be tested for because it's callback has a different signature

		self.$before(['createOne', 'readMany', 'readOne', 'deleteMany'], function(data, next) {
			ran.before++;
			next();
		});

		self.$after(['createOne', 'readMany', 'readOne', 'deleteMany'], function(data, next) {
			ran.after++;
			next();
		});

		self.$receive(['createOne', 'readMany', 'readOne', 'deleteMany'], function(data) {
			ran.receive++;
		});

	});

	Model.$createOne({
		'id': 1,
		'someProperty': 'someValue',
	}, function(err, data) {

		Model.$readMany({});

		Model.$readOne({
			'id': 1
		});

		Model.$deleteMany({
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

	Model.$use(function() {
		called = true;
	});

	assert.ok(called, 'plugin function was called');

});

QUnit.test('PLUGINS - plugin functions have the correct context', function(assert) {

	var called = false;

	var name = uuid.v4();
	var randomTestingValue = uuid.v4();

	var Model = marilyn.model(name, function() {
		self.testingPropery = randomTestingValue;
	});

	Model.$use(function() {
		if (randomTestingValue === self.testingPropery) {
			called = true;
		}
	});

	assert.ok(called, 'plugin function was called');

});