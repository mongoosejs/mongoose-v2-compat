
var mongoose = require('mongoose')
  , Query = mongoose.Query
  , Document = mongoose.Document
  , MArray = mongoose.Types.Array
  , assert = require('assert')

require('../');

describe('mongoose-v2-compat', function () {
  it('should have aliased methods from 2.x', function () {
    mongoose.compat = true;

    var methods = ('or nor gt gte lt lte ne in nin all regex '
                + 'size maxDistance mod near exists elemMatch '
                + 'within box center centerSphere slice').split(' ');

    methods.forEach(function assign (method) {
      assert.equal(Query.prototype['$' + method], Query.prototype[method]);
    })

    assert.equal(Query.prototype.run, Query.prototype.exec);
    assert.equal(Query.prototype.notEqualTo, Query.prototype.ne);
    assert.equal(Query.prototype.wherein, Query.prototype.within);
    assert.equal(Query.prototype.fields, Query.prototype.select);

    assert.equal('function', typeof Query.prototype.asc);
    assert.equal('function', typeof Query.prototype.desc);

    assert.equal(mongoose.createSetConnection, mongoose.createConnection);
    assert.equal(mongoose.connectSet, mongoose.connect);

    // gone methods
    assert.throws(function () {
      Query.prototype.only();
    }, /Query#only has been removed/);

    assert.throws(function () {
      Query.prototype.exclude();
    }, /Query#exclude has been removed/);

    assert.throws(function () {
      Query.prototype.each();
    }, /Query#each has been removed/);

    assert.equal('function', typeof Document.prototype.commit);

    assert.equal('function', typeof MArray.prototype.$push);
    assert.equal('function', typeof MArray.prototype.$pushAll);
    assert.equal('function', typeof MArray.prototype.$pull);
    assert.equal('function', typeof MArray.prototype.$pullAll);
    assert.equal('function', typeof MArray.prototype.$unshift);
    assert.equal('function', typeof MArray.prototype.$addToSet);

    mongoose.compat = false;

    var methods = ('or nor gt gte lt lte ne in nin all regex '
                + 'size maxDistance mod near exists elemMatch '
                + 'within box center centerSphere slice').split(' ');

    methods.forEach(function assign (method) {
      assert.equal(Query.prototype['$' + method], undefined);
    })

    assert.equal(Query.prototype.run, undefined);
    assert.equal(Query.prototype.notEqualTo, undefined);
    assert.equal(Query.prototype.wherein, undefined);
    assert.equal(Query.prototype.fields, undefined);

    assert.equal('undefined', typeof Query.prototype.asc);
    assert.equal('undefined', typeof Query.prototype.desc);

    assert.equal(mongoose.createSetConnection, undefined);
    assert.equal(mongoose.connectSet, undefined);
    assert.equal(Query.prototype.only, undefined);
    assert.equal(Query.prototype.exclude, undefined);
    assert.equal(Query.prototype.each, undefined);

    assert.equal('undefined', typeof Document.prototype.commit);

    assert.equal('undefined', typeof MArray.prototype.$push);
    assert.equal('undefined', typeof MArray.prototype.$pushAll);
    assert.equal('undefined', typeof MArray.prototype.$pull);
    assert.equal('undefined', typeof MArray.prototype.$pullAll);
    assert.equal('undefined', typeof MArray.prototype.$unshift);
    assert.equal('undefined', typeof MArray.prototype.$addToSet);
  })
})
